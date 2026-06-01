const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { 
  startShift, 
  endShift, 
  posCheckout 
} = require('../controllers/posController');

router.post('/shift/start', protect, authorize('staff', 'admin'), startShift);
router.post('/shift/end', protect, authorize('staff', 'admin'), endShift);
router.post('/checkout', protect, authorize('staff', 'admin'), posCheckout);

module.exports = router;
