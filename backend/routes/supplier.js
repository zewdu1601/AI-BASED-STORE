const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const { protect, authorize } = require('../middleware/auth');

const { 
  getMyPurchaseOrders, 
  updatePOStatus, 
  updateWholesalePrices 
} = require('../controllers/supplierController');

// Admin Routes
router.get('/', protect, authorize('admin'), async (req, res) => {
  const suppliers = await Supplier.find({});
  res.json(suppliers);
});

router.post('/', protect, authorize('admin'), async (req, res) => {
  const { name, email, phone, address } = req.body;
  const supplier = new Supplier({ name, email, phone, address });
  const createdSupplier = await supplier.save();
  res.status(201).json(createdSupplier);
});

// Supplier Specific Routes
router.get('/my-pos', protect, authorize('supplier'), getMyPurchaseOrders);
router.put('/po/:id', protect, authorize('supplier'), updatePOStatus);
router.put('/pricing', protect, authorize('supplier'), updateWholesalePrices);

module.exports = router;
