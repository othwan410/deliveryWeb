const { Store, Menu, User } = require('../models');


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

  readDetailStore = async (store_id) => {
    const readDetailStoreData = await Store.findOne({
      where: { store_id },
      attributes: ['name', 'img_url', 'call', 'content', 'rating'],
      include: [
        {
          model: Menu,
          attributes: ['name', 'price', 'img_url'],
        },
        {
          model: Dibs,
          attributes: ['user_id'],
        },
      ],
    });

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

  //가게 이름을 전체 조회
  findAllStoreName = async () => {
    const allStoreName = await Store.findAll({
      attributes: [
        'store_id',
        'name',
      ],
      order: [['createdAt', 'DESC']],
      raw: true,
    });

    return allStoreName;
  };

  //메뉴 이름을 전체 조회
  findAllMenuName = async () => {
    const allMenuName = await Menu.findAll({
      attributes: [
        'menu_id',
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
        'status'
      ],
      where: {user_id}
    });

    return userStatus;
  };
}

module.exports = StoreRepository;
