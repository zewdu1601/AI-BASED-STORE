const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { 
  approveProduct, 
  rejectProduct, 
  toggleUserStatus, 
  resetPassword, 
  deleteUser,
  createPromotion, 
  createBranch, 
  getAuditLogs,
  getPurchaseOrders,
  createPurchaseOrder,
  updatePOStatusAdmin,
  createUser,
  updateUser,
  suspendUser,
  sendUserNotification
} = require('../controllers/adminController');
const User = require('../models/User');
const Order = require('../models/Order');

// Existing routes
router.get('/users', protect, authorize('Admin', 'Sales Staff', 'Customer', 'Supplier'), async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders', protect, authorize('Admin', 'Sales Staff'), async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/analytics', protect, authorize('Admin', 'Sales Staff'), async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const orderCount = await Order.countDocuments();
    const userCount = await User.countDocuments();
    res.json({ totalSales: totalSales[0]?.total || 0, orderCount, userCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New Granular Admin Routes
router.put('/products/:id/approve', protect, authorize('Admin'), approveProduct);
router.put('/products/:id/reject', protect, authorize('Admin'), rejectProduct);
router.post('/users', protect, authorize('Admin'), createUser);
router.put('/users/:id', protect, authorize('Admin'), updateUser);
router.put('/users/:id/toggle', protect, authorize('Admin'), toggleUserStatus);
router.put('/users/:id/suspend', protect, authorize('Admin'), suspendUser);
router.post('/users/notify', protect, authorize('Admin'), sendUserNotification);
router.put('/users/:id/reset-password', protect, authorize('Admin'), resetPassword);
router.delete('/users/:id', protect, authorize('Admin'), deleteUser);
router.post('/promotions', protect, authorize('Admin'), createPromotion);
router.post('/branches', protect, authorize('Admin'), createBranch);
router.get('/audit-logs', protect, authorize('Admin'), getAuditLogs);

router.get('/purchase-orders', protect, authorize('Admin'), getPurchaseOrders);
router.post('/purchase-orders', protect, authorize('Admin'), createPurchaseOrder);
router.put('/purchase-orders/:id', protect, authorize('Admin'), updatePOStatusAdmin);

router.put('/orders/:id/status', protect, authorize('Admin', 'Sales Staff'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
