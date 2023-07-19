const OrderRepository = require('../repository/order_repository');

class OrderService {
  orderRepository = new OrderRepository();

  findAllUserOrder = async (user_id) => {
    return await this.orderRepository.findAllUserOrder(user_id);
  };

  findAllAdminOrder = async (store_id) => {
    return await this.orderRepository.findAllAdminOrder(store_id);
  };

  findOneOrder = async (order_id) => {
    const order = await this.orderRepository.findOneOrder(order_id);
    const menu = await this.orderRepository.findOneOrderMenu(order_id);
    return { order, menu };
  };

  updateOrderStatus = async (order_id, status) => {
    return await this.orderRepository.updateOrderStatus(order_id, status);
  };

  createOrder = async (
    user_id,
    address_id,
    store_id,
    price,
    request,
    menu_id,
    ea
  ) => {
    return await this.orderRepository.createOrder(
      user_id,
      address_id,
      store_id,
      price,
      request,
      menu_id,
      ea
    );
  };

  deleteOrder = async (order_id) => {
    return await this.orderRepository.deleteOrder(order_id);
  };
}

module.exports = OrderService;
