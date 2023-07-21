const DibsService = require('../services/dibs_service');

class DibsController {
  dibsService = new DibsService();

  //찜 등록
  createDibs = async (req, res, next) => {
    try {
      const user_id = res.locals.user_id;
      const store_id = parseInt(req.query.store_id);

      await this.dibsService.createDibs(user_id, store_id);

      return res.redirect(`/stores/detail?store_id=${store_id}`);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: error });
    }
  };

  //찜 삭제
  deleteDibs = async (req, res, next) => {
    try {
      const user_id = res.locals.user_id;
      const store_id = parseInt(res.query.store_id);

      await this.storeService.deleteStore(user_id, store_id);
      return res.redirect(`/stores/detail?store_id=${store_id}`);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error });
    }
  };

  //내가 찜한 가게 조회
  findMyDibs = async (req, res) => {
    const userId = res.locals.user_id;

    await this.dibsService
      .findMyDibs(userId)
      .then((myDibs) => {
        return res.status(200).json({ myDibs });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };
}

module.exports = DibsController;
