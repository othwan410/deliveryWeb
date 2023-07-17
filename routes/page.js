const express = require('express');
const { isLoggedIn } = require('../middleware/userState_middleware');
const {
  renderMain,
  renderCategory,
  renderDetail,
  renderOrder,
  renderOrderDetail,
  renderPayment,
} = require('../controllers/page_controller');
const { jwtAuthMiddleware } = require('../middleware/jwtAuth_middleware');

const router = express();

router.get('/', isLoggedIn, renderMain);

router.get('/category', renderCategory);

router.get('/store', renderDetail);

router.get('/order', jwtAuthMiddleware, renderOrder);

router.get('/orderDetail', jwtAuthMiddleware, renderOrderDetail);

router.get('/payment', jwtAuthMiddleware, renderPayment);

module.exports = router;
