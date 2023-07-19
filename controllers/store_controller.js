const StoreService = require('../service/store_service');

class StoresController {
  storeService = new StoreService();

  //가게 등록
  createStore = async (req, res, next) => {
    try {
      const user_id = res.locals.user_id;
      const store_id = req.params;
      const { name, call, category_id, address, content, img_url } = req.body;
      const createStoreData = await this.storeService.createStore(
        user_id,
        store_id,
        name,
        call,
        category_id,
        address,
        content,
        img_url
      );

      return res.status(201).json({ data: createStoreData });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: '가게 등록에 실패했습니다.' });
    }
  };

  //가게 수정
  updateStore = async (req, res, next) => {
    try {
      const user_id = res.locals.user;
      const { store_id } = req.params;
      const { name, call, category_id, address, content, img_url } = req.body;
      const [updateStoreData] = await this.storeService.updateStore(
        user_id,
        store_id,
        name,
        call,
        category_id,
        address,
        content,
        img_url
      );

      if (!updateStoreData) {
        return res.status(400).json({ data: '가게 수정에 실패했습니다.' });
      }
      return res.status(201).json({ data: '가게 수정에 성공했습니다.' });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '가게 수정에 실패했습니다.' });
    }
  };

  //가게 삭제
  deleteStore = async (req, res, next) => {
    try {
      const user_id = res.locals.user;
      const { store_id } = req.params;
      const deleteStoreData = await this.StoreService.deleteStore(user_id, store_id);

      if (!deleteStoreData) {
        return res.status(400).json({ data: '가게 삭제에 실패했습니다.' });
      }
      return res.status(201).json({ data: '가게 삭제에 성공했습니다.' });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '가게 삭제에 실패했습니다.' });
    }
  };
}

module.exports = StoresController;