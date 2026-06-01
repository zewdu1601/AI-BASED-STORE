const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// --- PURCHASE ORDERS ---
exports.getMyPurchaseOrders = async (req, res) => {
  try {
    const pos = await PurchaseOrder.find({ supplier: req.user.supplierId }).populate('items.product');
    res.json(pos);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updatePOStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;
    const po = await PurchaseOrder.findById(req.params.id);
    if (!po) return res.status(404).json({ message: 'PO not found' });

    po.status = status;
    if (trackingNumber) po.trackingNumber = trackingNumber;
    
    // If delivered, auto-update store stock
    if (status === 'delivered') {
      for (const item of po.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity }
        });
      }

      // Notify Admin about delivery and stock update
      const Notification = require('../models/Notification');
      await Notification.create({
        type: 'Stock',
        title: 'Inventory Replenished',
        message: `Purchase Order ${po._id} has been delivered. Store stock has been automatically updated.`,
        priority: 'High',
        metadata: { poId: po._id }
      });
    }

    await po.save();
    res.json(po);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- INVENTORY & PRICING ---
exports.updateWholesalePrices = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.user.supplierId);
    if (!supplier) return res.status(404).json({ message: 'Supplier profile not found' });

    supplier.wholesalePricing = { ...supplier.wholesalePricing, ...req.body.prices };
    await supplier.save();
    res.json(supplier);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
