const OrderRepository = require('../repositories/order_repository');

class OrderService {
  orderRepository = new OrderRepository();

  findAllUserOrder = async (user_id) => {
    return await this.orderRepository.findAllUserOrder(user_id);
  };

  findAllAdminOrder = async (store_id) => {
    return await this.orderRepository.findAllAdminOrder(store_id);
  };

  findOneOrder = async (order_id) => {
    return await this.orderRepository.findOneOrder(order_id);
  };

  findOneOrderMenu = async (order_id) => {
    return await this.orderRepository.findOneOrderMenu(order_id);
  };

  updateOrderStatus = async (order_id, status) => {
    return await this.orderRepository.updateOrderStatus(order_id, status);
  };
  createOrder = async (user_id, address_id, store_id, price, request) => {
    return await this.orderRepository.createOrder(
      user_id,
      address_id,
      store_id,
      price,
      request
    );
  };
  createOrderMenu = async (order_id, menu_id, ea) => {
    return await this.orderRepository.createOrderMenu(order_id, menu_id, ea);
  };
  deleteOrder = async (order_id) => {
    return await this.orderRepository.deleteOrder(order_id);
  };
  deleteOrderMenu = async (order_id) => {
    return await this.orderRepository.deleteOrderMenu(order_id);
  };
}

module.exports = OrderService;
