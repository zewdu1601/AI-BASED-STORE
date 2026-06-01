const Shift = require('../models/Shift');
const Order = require('../models/Order');
const Product = require('../models/Product');

// --- SHIFT MANAGEMENT ---
exports.startShift = async (req, res) => {
  try {
    const shift = await Shift.create({
      staff: req.user._id,
      initialCash: req.body.initialCash
    });
    res.status(201).json(shift);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.endShift = async (req, res) => {
  try {
    const shift = await Shift.findOne({ staff: req.user._id, status: 'open' });
    if (!shift) return res.status(404).json({ message: 'No open shift found' });
    
    shift.endTime = Date.now();
    shift.finalCash = req.body.finalCash;
    shift.status = 'closed';
    await shift.save();
    res.json(shift);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- POS CHECKOUT ---
exports.posCheckout = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;
    
    // Create POS Order
    const order = await Order.create({
      user: req.user._id, // Staff acting as proxy or linked customer
      items,
      totalAmount,
      paymentMethod,
      orderType: 'pos',
      processedBy: req.user._id,
      status: 'paid'
    });

    // Update Inventory
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // Update Shift Total
    await Shift.findOneAndUpdate(
      { staff: req.user._id, status: 'open' },
      { $inc: { totalSales: totalAmount } }
    );

    res.status(201).json(order);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
