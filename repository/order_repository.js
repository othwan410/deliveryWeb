const { Op } = require('sequelize');
const { Posts, Likeds, sequelize } = require('../models');
const { Transaction } = require('sequelize');

class orderRepository {
  findAllUserOrder = async () => {
    return await Posts.findAll({
      attributes: [
        'postId',
        'title',
        'likedCount',
        'createdAt',
        'updatedAt',
        [
          sequelize.literal(
            '(SELECT nickname AS nickname FROM Users WHERE Users.userId = Posts.userId)'
          ),
          'nickname',
        ],
      ],
      order: [['createdAt', 'DESC']],
      raw: true,
    });
  };
}

module.exports = orderRepository;
