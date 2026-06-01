const Product = require('../models/Product');
const UserAction = require('../models/UserAction');
const { getUserSegment, getDemandForecast } = require('../services/aiService');

// --- PERSONALIZATION ---
exports.getPersonalizedFeed = async (req, res) => {
  try {
    const segment = req.user ? await getUserSegment(req.user._id) : 'NEW';
    
    // Simple logic: If VIP/LOYAL, show high-rated & premium products first
    let query = {};
    if (segment === 'VIP' || segment === 'LOYAL') {
      query = { price: { $gt: 100 } };
    }

    const products = await Product.find(query).sort({ rating: -1 }).limit(10);
    res.json({ segment, products });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- UPSELL & CROSS-SELL ---
exports.getUpsellCrossSell = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Upsell: More expensive product in same category
    const upsells = await Product.find({
      category: product.category,
      price: { $gt: product.price },
      _id: { $ne: product._id }
    }).limit(3);

    // Cross-sell: Products in complementary categories (simulated)
    const crossSells = await Product.find({
      category: { $ne: product.category }
    }).limit(3);

    res.json({ upsells, crossSells });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- PREDICTIVE INSIGHTS (ADMIN ONLY) ---
exports.getAIBusinessInsights = async (req, res) => {
  try {
    const products = await Product.find({}).limit(5);
    const insights = [];

    for (const p of products) {
      const forecast = await getDemandForecast(p._id);
      insights.push({
        productName: p.name,
        demandForecast: forecast,
        conversionRate: '12.4%', // Simulated
        trending: forecast.includes('HIGH')
      });
    }

    res.json(insights);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- ACTION TRACKING ---
exports.trackUserAction = async (req, res) => {
  try {
    const { actionType, productId, category } = req.body;
    await UserAction.create({
      user: req.user?._id,
      actionType,
      product: productId,
      category
    });
    res.status(201).json({ success: true });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
