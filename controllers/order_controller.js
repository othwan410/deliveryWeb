const OrderService = require('../service/order_servie');

class OrderController {
  orderService = new OrderService();
  //
  findOneAdminOrder = async (req, res, next) => {
    try {
        const orders = await this.orderService.findOneAdminOrder(order_id);
        return res.status(200).json({ data: orders });
    } catch (error) {
        return res.status(400).json({ errorMessage: '주문메뉴를 찾을 수 없습니다.' });
    }
  };
}

module.exports = PostsController;