const StoreRepository = require('../repositories/store_repository');

class StoreService {
  storeRepository = new StoreRepository();

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
    const createStoreData = await this.storeRepository.createStore(
      user_id,
      name,
      call,
      category_id,
      address,
      content,
      img_url
    );

    return createStoreData;
  };
  //카테고리별 가게조회
  readStore = async (category_id) => {
    const readAllfindStoreData = await this.storeRepository.readStore(
      category_id
    );

    return readAllfindStoreData;
  };

  readDetailStore = async (store_id, user_id) => {
    const readDetailStoreData = await this.storeRepository.readDetailStore(
      store_id
    );

    const data = {
      store: {
        name: readDetailStoreData.name,
        img_url: readDetailStoreData.img_url,
        call: readDetailStoreData.call,
        content: readDetailStoreData.content,
        rating: readDetailStoreData.rating,
        menu: readDetailStoreData.Menus.map((menu) => ({
          name: menu.name,
          desc: menu.desc,
          price: menu.price,
          img_url: menu.img_url,
        })),
        dibs: readDetailStoreData.Dibs,
      },
    };

    return data;
  };

  //가게 수정
  updateStore = async (name, call, category_id, address, content, img_url) => {
    const updateStoreData = await this.storeRepository.updateStore(
      name,
      call,
      category_id,
      address,
      content,
      img_url
    );

    return updateStoreData;
  };

  //가게 삭제
  deleteStore = async (store_id) => {
    const deleteStoreData = await this.storeRepository.deleteStore(store_id);

    return deleteStoreData;
  };

  //메뉴 등록
  createMenu = async (store_id, name, price, img_url) => {
    const createMenuData = await this.storeRepository.createMenu(
      store_id,
      name,
      price,
      img_url
    );

    return createMenuData;
  };

  //메뉴 수정
  updateMenu = async (name, price, img_url) => {
    const updateMenuData = await this.storeRepository.updateMenu(
      name,
      price,
      img_url
    );

    return updateMenuData;
  };

  //메뉴 삭제
  deleteMenu = async (menu_id) => {
    const deleteMenuData = await this.storeRepository.deleteMenu(menu_id);

    return deleteMenuData;
  };
}

module.exports = StoreService;
