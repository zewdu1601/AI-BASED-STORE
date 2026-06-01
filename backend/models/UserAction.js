const mongoose = require('mongoose');

const userActionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actionType: { type: String, enum: ['view', 'click', 'cart_add', 'purchase'], required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  category: { type: String },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('UserAction', userActionSchema);
