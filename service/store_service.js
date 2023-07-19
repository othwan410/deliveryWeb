const StoreRepository = require('../repository/store_repository');

class StoreService {
  storeRepository = new StoreRepository();

  //가게 등록
  createStore = async (user_id, name, call, category_id, address, content, img_url) => {
    const createStoreData = await this.storeRepository.createStore(
        user_id,
        name,
        call,
        category_id,
        address,
        content,
        img_url,
    );

    return createStoreData;
  };

  //가게 수정
  updateStore = async (name, call, category_id, address, content, img_url) => {
    const updateStoreData = await this.storeRepository.updateStore(
        name,
        call,
        category_id,
        address,
        content,
        img_url,
    );

    return updateStoreData;
  };

  //가게 삭제
  deleteStore = async (store_id) => {
    const deleteStoreData = await this.storeRepository.deleteStore(
      store_id
    );

    return deleteStoreData;
  };
}

module.exports = StoreService;