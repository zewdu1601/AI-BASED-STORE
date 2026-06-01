const Product = require('../models/Product');
const Order = require('../models/Order');

/**
 * AI Recommendation Service
 * Simulates advanced recommendations using purchase history and browsing behavior
 */
const getRecommendations = async (userId) => {
  try {
    // 1. Get user purchase history
    const pastOrders = await Order.find({ user: userId }).populate('items.product');
    
    // 2. Identify categories user is interested in
    const categories = new Set();
    pastOrders.forEach(order => {
      order.items.forEach(item => {
        if (item.product && item.product.category) {
          categories.add(item.product.category);
        }
      });
    });

    // 3. Recommend products from those categories or trending products
    let recommended;
    if (categories.size > 0) {
      recommended = await Product.find({ 
        category: { $in: Array.from(categories) } 
      }).limit(10);
    } else {
      // Default to trending/high rated products if no history
      recommended = await Product.find().sort({ rating: -1 }).limit(10);
    }

    return recommended;
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    return [];
  }
};

module.exports = { getRecommendations };
