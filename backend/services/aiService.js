const UserAction = require('../models/UserAction');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Weights for behavioral analysis
const WEIGHTS = { VIEW: 1, CLICK: 2, CART: 5, PURCHASE: 10 };

/**
 * Predicts user segment based on historical activity
 */
exports.getUserSegment = async (userId) => {
  const actions = await UserAction.find({ user: userId });
  const totalScore = actions.reduce((acc, curr) => {
    if (curr.actionType === 'view') return acc + WEIGHTS.VIEW;
    if (curr.actionType === 'click') return acc + WEIGHTS.CLICK;
    if (curr.actionType === 'cart_add') return acc + WEIGHTS.CART;
    if (curr.actionType === 'purchase') return acc + WEIGHTS.PURCHASE;
    return acc;
  }, 0);

  if (totalScore > 500) return 'VIP';
  if (totalScore > 200) return 'LOYAL';
  if (totalScore > 50) return 'REGULAR';
  return 'NEW';
};

/**
 * Forecasts demand for a product based on view/cart spikes
 */
exports.getDemandForecast = async (productId) => {
  const recentActions = await UserAction.countDocuments({
    product: productId,
    timestamp: { $gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
  });
  
  if (recentActions > 100) return 'HIGH (Restock Urgent)';
  if (recentActions > 50) return 'MODERATE';
  return 'STABLE';
};

/**
 * Detects potential fraud patterns
 */
exports.detectFraud = async (orderData) => {
  // Simple pattern: Single order > $10k or > 5 orders in 10 mins
  if (orderData.totalAmount > 10000) return true;
  
  const recentOrders = await Order.countDocuments({
    user: orderData.user,
    createdAt: { $gt: new Date(Date.now() - 10 * 60 * 1000) }
  });
  
  return recentOrders > 5;
};
