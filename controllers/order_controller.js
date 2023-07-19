const OrderService = require('../services/posts.service');

class OrderController {
  OrderService = new OrderService();
}

module.exports = OrderController;
