const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  brand: { type: String },
  stock: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 5 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  attributes: { type: Map, of: String },
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
