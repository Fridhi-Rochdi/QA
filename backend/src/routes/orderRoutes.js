const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getVendorSales
} = require('../controllers/orderController');
const { protect, authorize } = require('../middlewares/auth');

router.post('/', protect, authorize('client'), createOrder);
router.get('/me', protect, authorize('client'), getMyOrders);
router.get('/vendor/sales', protect, authorize('vendeur', 'admin'), getVendorSales);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, authorize('vendeur', 'admin'), updateOrderStatus);

module.exports = router;
