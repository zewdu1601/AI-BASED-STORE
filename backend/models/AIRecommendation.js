const mongoose = require('mongoose');

const aiRecommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  suggestedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  basis: { type: String }, // e.g. "Frequent purchases", "View history"
  confidenceScore: { type: Number, min: 0, max: 1 },
  isConverted: { type: Boolean, default: false }, // Did the user buy the suggested item?
  logs: [{
    action: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('AIRecommendation', aiRecommendationSchema);
