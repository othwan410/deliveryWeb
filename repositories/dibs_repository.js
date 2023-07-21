const { Dibs } = require('../models');
const { User } = require('../models');
const { Store } = require('../models');

class DibsRepository {
  //찜 등록
  createDibs = async (user_id, store_id) => {
    await Dibs.create({
      user_id,
      store_id,
    });
  };
  //찜 조회
  readDibs = async (user_id, store_id) => {
    const dibs = await Dibs.findOne({
      attributes: ['user_id', 'store_id'],
      where: { user_id, store_id },
    });
    return dibs;
  };

  //찜 삭제
  deleteDibs = async (user_id, store_id) => {
    await Dibs.destroy({ where: { user_id, store_id } });
  };
}

module.exports = DibsRepository;
