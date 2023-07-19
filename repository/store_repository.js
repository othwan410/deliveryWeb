const { Op } = require('sequelize');
const { Store, sequelize } = require('../models');
const { Transaction } = require('sequelize');

class StoreRepository {
  //가게 등록
  createStore = async (
    user_id,
    store_id,
    name,
    call,
    category_id,
    address,
    content,
    img_url
  ) => {
    const createStoreData = await Store.create({
      user_id: user_id,
      store_id,
      name,
      call,
      category_id,
      address,
      content,
      img_url,
    });

    return createStoreData;
  };

  //카테고리별 가게조회

  readStore = async (category_id) => {
    const readAllfindStoreData = await Store.findAll(
      {
        attributes: ['name', 'img_url', 'rating', 'store_id'],
        order: [['createdAt', 'DESC']],
      },
      {
        where: { category_id },
      }
    );

    return readAllfindStoreData;
  };

  //가게 수정
  updateStore = async (
    user_id,
    store_id,
    name,
    call,
    category_id,
    address,
    content,
    img_url
  ) => {
    const updateStoreData = await Store.update(
      { name, call, category_id, address, content, img_url },
      {
        where: {
          [Op.and]: [{ store_id }, { user_id: user_id }],
        },
      }
    );

    return updateStoreData;
  };

  //가게 삭제
  deleteStore = async (user_id, store_id) => {
    const deleteStoreData = await Store.destroy({
      where: { [Op.and]: [{ store_id }, { user_id: user_id }] },
    });

    return deleteStoreData;
  };
}

module.exports = StoreRepository;
