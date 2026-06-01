const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  method: { type: String, enum: ['Stripe', 'PayPal', 'Crypto', 'Bank Transfer'], required: true },
  status: { type: String, enum: ['Pending', 'Success', 'Failed', 'Refunded'], default: 'Pending' },
  transactionId: { type: String, unique: true },
  metadata: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
