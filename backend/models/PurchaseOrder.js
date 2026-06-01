const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    wholesalePrice: { type: Number, required: true }
  }],
  totalCost: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'shipped', 'delivered'], default: 'pending' },
  trackingNumber: { type: String },
  deliveryDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
