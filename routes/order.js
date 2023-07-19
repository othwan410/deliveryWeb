const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order_controller');
const orderController = new OrderController();
const { authorizated } = require('../middleware/userState_middleware');

router.get('/userOrders', authorizated, orderController.findAllUserOrder);
router.get('/adminOrders', authorizated, orderController.findAllAdminOrder);
router.get('/orders/:order_id', authorizated, orderController.findOneOrder);
router.put(
  '/orders/:order_id',
  authorizated,
  orderController.updateOrderStatus
);
router.post('/orders', authorizated, orderController.createOrder);
router.delete('/orders/:order_id', authorizated, orderController.deleteOrder);

module.exports = router;
