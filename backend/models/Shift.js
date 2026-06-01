const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  initialCash: { type: Number, required: true },
  finalCash: { type: Number },
  totalSales: { type: Number, default: 0 },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('Shift', shiftSchema);
