const express = require('express');
const router = express.Router();
const { 
  getPersonalizedFeed, 
  getUpsellCrossSell, 
  getAIBusinessInsights, 
  trackUserAction 
} = require('../controllers/recommendationController');
const { protect, authorize } = require('../middleware/auth');

router.get('/feed', protect, getPersonalizedFeed);
router.get('/upsell/:id', getUpsellCrossSell);
router.get('/insights', protect, authorize('admin'), getAIBusinessInsights);
router.post('/track', trackUserAction);

module.exports = router;
