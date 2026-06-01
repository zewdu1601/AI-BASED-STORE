const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Sales', 'Inventory', 'Customer', 'Staff', 'AI Analytics', 'Revenue'], 
    required: true 
  },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateRange: {
    start: Date,
    end: Date
  },
  fileUrl: { type: String }, // Path to PDF/Excel if stored
  format: { type: String, enum: ['PDF', 'Excel', 'JSON'], default: 'PDF' },
  data: { type: Object } // Snapshot of report data
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
