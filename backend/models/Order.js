const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  pointsEarned: { type: Number, default: 0 },
  couponCode: { type: String },
  orderType: { type: String, enum: ['online', 'pos'], default: 'online' },
  deliveryMethod: { type: String, enum: ['Online', 'Pickup', 'Delivery'], default: 'Online' },
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  paymentMethod: { type: String },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Refunded'], default: 'Pending' },
  shippingAddress: { type: String },
  phone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
