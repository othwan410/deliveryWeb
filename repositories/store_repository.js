const { Op } = require('sequelize');
const { Store, Menu, sequelize, Review, Dibs, User } = require('../models');
const { Transaction } = require('sequelize');

class StoreRepository {
  //가게 등록
  createStore = async (
    user_id,
    name,
    call,
    category_id,
    address,
    content,
    img_url
  ) => {
    const createStoreData = await Store.create({
      user_id,
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
    const readAllfindStoreData = await Store.findAll({
      attributes: ['name', 'img_url', 'rating', 'store_id', 'call'],
      order: [['createdAt', 'DESC']],
      where: { category_id },
    });

    return readAllfindStoreData;
  };

  readStoreById = async (storeIdSet) => {
    const store_id = [...storeIdSet];

    const store = await Store.findAll({
      attributes: ['name', 'img_url', 'rating', 'store_id', 'call'],
      order: [['createdAt', 'DESC']],
      where: { store_id: { [Op.in]: store_id } },
    });

    return store;
  };

  readStoreByKeywordInMenu = async (keyword) => {
    const menuStoreIds = await sequelize.query(
      `SELECT DISTINCT store_id FROM menus WHERE name like '%${keyword}%'`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return menuStoreIds;
  };

  readStoreByKeywordInStore = async (keyword) => {
    const storeStoreIds = await sequelize.query(
      `SELECT DISTINCT store_id FROM stores WHERE name LIKE '%${keyword}%'`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return storeStoreIds;
  };

  readDetailStore = async (store_id) => {
    const readDetailStoreData = await Store.findOne({
      where: { store_id },
      attributes: ['name', 'img_url', 'call', 'content', 'rating', 'store_id'],
      include: [
        {
          model: Menu,
          attributes: ['name', 'price', 'img_url', 'desc'],
        },
        {
          model: Dibs,
          attributes: ['user_id'],
        },
      ],
    });
    // const reviewCount = await Review.findAndCountAll({
    //   where: { store_id },
    // });

    return readDetailStoreData;
  };
  //가게 수정
  updateStore = async (
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
          store_id,
        },
      }
    );

    return updateStoreData;
  };

  //가게 삭제
  deleteStore = async (store_id) => {
    const deleteStoreData = await Store.destroy({
      where: { store_id },
    });

    return deleteStoreData;
  };

  //메뉴 등록
  createMenu = async (store_id, name, price, img_url, desc) => {
    const createMenuData = await Menu.create({
      store_id,
      name,
      price,
      img_url,
      desc,
    });

    return createMenuData;
  };

  //메뉴 수정
  updateMenu = async (menu_id, name, price, img_url) => {
    const updateMenuData = await Menu.update(
      { name, price, img_url },
      {
        where: {
          menu_id,
        },
      }
    );

    return updateMenuData;
  };

  //메뉴 삭제
  deleteMenu = async (menu_id) => {
    const deleteMenuData = await Menu.destroy({
      where: { menu_id },
    });

    return deleteMenuData;
  };

  //사장님 가게 이름 조회
  findStoreName = async (store_id) => {
    const storeName = await Store.findOne({
      where: { store_id },
      attributes: [
        'name'
      ],
      raw: true,
    });

    return storeName;
  };

  //사장님 메뉴이름 전체 조회
  findAllMenuName = async (store_id) => {
    const allMenuName = await Menu.findAll({
      where: { store_id },
      attributes: [
        'name',
      ],
      order: [['createdAt', 'DESC']],
      raw: true,
    });

    return allMenuName;
  };

  //user_id 의 status
  findOneStatus = async (user_id) => {
    const userStatus = await User.findOne({
      attributes: [
        'status',
        [
          sequelize.literal(
            `(SELECT store_id FROM stores WHERE stores.user_id = ${user_id})`
          ),
          'store_id',
        ],
      ],
      where: {user_id},
      raw: true
    });

    return userStatus;
  };
}

module.exports = StoreRepository;
