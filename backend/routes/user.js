const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  getUserProfile, 
  updateUserProfile, 
  addToWishlist, 
  removeFromWishlist,
  subscribeUser
} = require('../controllers/userController');

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/wishlist')
  .post(protect, addToWishlist);

router.route('/wishlist/:productId')
  .delete(protect, removeFromWishlist);

router.route('/subscribe')
  .post(subscribeUser);

module.exports = router;
