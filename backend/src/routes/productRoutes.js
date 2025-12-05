const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/auth');

router.route('/')
  .get(getAllProducts)
  .post(protect, authorize('vendeur', 'admin'), createProduct);

router.get('/vendor/me', protect, authorize('vendeur', 'admin'), getMyProducts);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorize('vendeur', 'admin'), updateProduct)
  .delete(protect, authorize('vendeur', 'admin'), deleteProduct);

module.exports = router;
