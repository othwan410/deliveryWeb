const { Op } = require('sequelize');
const { Store, Menu, sequelize } = require('../models');
const { Transaction } = require('sequelize');

class StoreRepository {
  
  //가게 등록
  createStore = async (user_id, name, call, category_id, address, content, img_url) => {
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

  //가게 수정
  updateStore = async (store_id, name, call, category_id, address, content, img_url) => {
    const updateStoreData = await Store.update(
      { name,
        call,
        category_id,
        address,
        content,
        img_url, },
      {
        where: {
           store_id
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
  createMenu = async (store_id, name, price, img_url) => {
    const createMenuData = await Menu.create({
      store_id,
      name,
      price,
      img_url,
    });

    return createMenuData;
  };

  //메뉴 수정
  updateMenu = async (menu_id, name, price, img_url) => {
    const updateMenuData = await Menu.update(
      { name,
        price,
        img_url, },
      {
        where: {
           menu_id
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
}

module.exports = StoreRepository;