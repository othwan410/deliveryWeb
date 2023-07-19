const { Order, Order_menus, User, sequelize } = require('../models');
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
            '(SELECT name AS name FROM stores WHERE stores.store_id = store_id)'
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
            '(SELECT name AS name FROM stores WHERE stores.store_id = Order.store_id)'
          ),
          'name',
        ],
      ],
      where: { store_id, status: [1, 2, 3, 4] },
      order: [['status', 'createdAt', 'DESC']],
      raw: true,
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
            '(SELECT name AS name FROM stores WHERE stores.store_id = Order.store_id)'
          ),
          'name',
        ],
        'status',
        'createdAt',
      ],
      where: { order_id },
      raw: true,
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
      raw: true,
    });
  };

  updateOrderStatus = async (order_id, status) => {
    if (status === 0) {
      try {
        const t = await sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
        });
        const order = await Order.update(
          { status },
          { where: { order_id }, transaction: t }
        );
        await User.update(
          {
            point: point + [sequelize.literal('(SELECT price FROM Order)')],
          },
          {
            where: {
              user_id: order.user_id,
            },
            transaction: t,
          }
        );
        await t.commit();
        return true;
      } catch (error) {
        await t.rollback();
        return false;
      }
    }
    if (status === 4) {
      try {
        const t = await sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
        });
        const order = await Order.update(
          { status },
          { where: { order_id }, transaction: t }
        );
        await User.update(
          {
            point: point + [sequelize.literal('(SELECT price FROM Order)')],
          },
          {
            where: {
              user_id: [
                sequelize.literal(
                  `(SELECT user_id FROM Store WHERE store_id = ${order.store_id})`
                ),
              ],
            },
            transaction: t,
          }
        );
        await t.commit();
        return true;
      } catch (error) {
        await t.rollback();
        return false;
      }
    }
    return await Order.update({ status }, { where: { order_id } });
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
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
    });
    try {
      const order = await Order.create(
        {
          user_id,
          address_id,
          store_id,
          price,
          request,
        },
        { transaction: t }
      );

      await Order_menus.create(
        { order_id: order.order_id, menu_id, ea },
        { transaction: t }
      );

      await User.update(
        {
          point: point - [sequelize.literal('(SELECT price FROM Order)')],
        },
        {
          where: user_id,
          transaction: t,
        }
      );

      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      return false;
    }
  };

  deleteOrder = async (order_id) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
    });
    await Order.destroy({ order_id }, { transaction: t });
    await Order_menus.destroy({ order_id }, { transaction: t });
  };
}

module.exports = orderRepository;
