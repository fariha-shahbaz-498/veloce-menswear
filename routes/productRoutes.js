const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  createProduct, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), createProduct); // Only admins can create items

router.route('/:id')
  .get(getProductById)
  .put(protect, authorize('admin'), updateProduct)   // Only admins can modify items
  .delete(protect, authorize('admin'), deleteProduct); // Only admins can remove items

module.exports = router;