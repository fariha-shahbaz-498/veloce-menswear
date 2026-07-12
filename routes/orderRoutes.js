const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Mount protect middleware directly on these execution tracks
router.route('/')
  .post(protect, addOrderItems);

router.route('/myorders')
  .get(protect, getMyOrders);

module.exports = router;