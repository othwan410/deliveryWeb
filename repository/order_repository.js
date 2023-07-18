const { Op } = require('sequelize');
const { Order, Order_menus, sequelize } = require('../models');
const { Transaction } = require('sequelize');

class orderRepository {
  findAllUserOrder = async (user_id) => {
    return await Order.findAll({
      attributes: [
        'order_id',
        'price',
        'status',
        'createdAt',
        [
          sequelize.literal(
            '(SELECT name AS name FROM Store WHERE Store.store_id = Order.store_id)'
          ),
          'name',
        ],
      ],
      where: { user_id },
      order: [['createdAt', 'DESC']],
      raw: true,
    });
  };

  findAllAdminOrder = async (store_id) => {
    return await Order.findAll({
      attributes: [
        'order_id',
        'price',
        'status',
        'createdAt',
        [
          sequelize.literal(
            '(SELECT name AS name FROM Store WHERE Store.store_id = Order.store_id)'
          ),
          'name',
        ],
      ],
      where: { store_id },
    });
  };

  findOneOrder = async (order_id) => {
    return await Order.findOne({
      attributes: [
        'order_id',
        'price',
        'request',
        'address',
        [
          sequelize.literal(
            '(SELECT name AS name FROM Store WHERE Store.store_id = Order.store_id)'
          ),
          'name',
        ],
        'status',
        'createdAt',
      ],
      where: { order_id },
    });
  };

  findOneOrderMenu = async (order_id) => {
    return await Order_menus.findOne({
      attributes: [
        [
          sequelize.literal(
            '(SELECT name AS name FROM Menu WHERE Menu.menu_id = Order_menus.menu_id)'
          ),
          'name',
        ],
        'ea',
      ],
      where: { order_id },
    });
  };

  updateOrderStatus = async (order_id, status) => {
    return await Order.update({ status }, { where: { order_id } });
  };

  createOrder = async (user_id, address_id, store_id, price, request) => {
    return await Order.create({
      user_id,
      address_id,
      store_id,
      price,
      request,
    });
  };

  createOrderMenu = async (order_id, menu_id, ea) => {
    return await Order_menus.create({ order_id, menu_id, ea });
  };

  deleteOrder = async (order_id) => {
    return await Order_menus.destroy({ order_id });
  };

  deleteOrderMenu = async (order_id) => {
    return await Order_menus.destroy({ order_id });
  };
}

module.exports = orderRepository;
