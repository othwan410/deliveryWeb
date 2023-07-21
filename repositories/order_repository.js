const { Op } = require('sequelize');
const { Order, Order_menu, User, sequelize } = require('../models');
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
      order: [['status'], ['createdAt', 'DESC']],
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
    return await Order_menu.findOne({
      attributes: [
        [
          sequelize.literal(
            '(SELECT name AS name FROM Menu WHERE Menu.menu_id = Order_menu.menu_id)'
          ),
          'name',
        ],
        'ea',
      ],
      where: { order_id },
      raw: true,
    });
  };

  //order테이블 status 업데이트
  updateOrderStatus = async (order_id, status, user_id) => {
    const order = await Order.findOne({
      attributes: ['user_id', 'price'],
      where: { order_id },
    });

    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
    });

    if (parseInt(status) === 0) {
      try {
        const point = await User.findOne({
          attributes: ['point'],
          where: { user_id: order.user_id },
        });

        await Order.update({ status }, { where: { order_id }, transaction: t });

        await User.update(
          {
            point: point.point + order.price,
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
        console.log(error);
        await t.rollback();
        return false;
      }
    }
    if (parseInt(status) === 4) {
      try {
        await Order.update({ status }, { where: { order_id }, transaction: t });

        const point = await User.findOne({
          attributes: ['point'],
          where: { user_id },
        });

        await User.update(
          {
            point: point.point + order.price,
          },
          {
            where: {
              user_id,
            },
            transaction: t,
          }
        );

        await t.commit();
        return true;
      } catch (error) {
        console.log(error);
        await t.rollback();
        return false;
      }
    }
    return await Order.update({ status }, { where: { order_id } });
  };

  createOrder = async (user_id, address_id, store_id, price, request, menu) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
    });
    try {
      const order = await Order.create(
        {
          user_id,
          address_id: parseInt(address_id),
          store_id,
          price,
          request,
        },
        { transaction: t }
      );

      for (let i = 0; i < menu.menu_id.length; i++) {
        await Order_menu.create(
          {
            order_id: order.order_id,
            menu_id: menu.menu_id[i],
            ea: menu.ea[i],
          },
          { transaction: t }
        );
      }
      const point = await User.findOne({
        attributes: ['point'],
        where: { user_id },
      });

      await User.update(
        {
          point: point.point - order.price,
        },
        {
          where: { user_id },
          transaction: t,
        }
      );

      await t.commit();
      return true;
    } catch (error) {
      console.log(error);
      await t.rollback();
      return false;
    }
  };

  deleteOrder = async (order_id) => {
    try {
      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
      });
      await Order.destroy({ where: { order_id }, transaction: t });
      await Order_menu.destroy({ where: { order_id }, transaction: t });

      await t.commit();
      return true;
    } catch (error) {
      console.log(error);
      await t.rollback();
      return false;
    }
  };
}

module.exports = orderRepository;
