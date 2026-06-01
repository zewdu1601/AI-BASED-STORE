const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: null for global admin alerts
  type: { 
    type: String, 
    enum: ['Order', 'Stock', 'Payment', 'Delivery', 'User', 'System'], 
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  metadata: { type: Object } // e.g. { orderId: '...' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
