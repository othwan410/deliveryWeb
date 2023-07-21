const { Dibs } = require('../models');

class DibsRepository {
  //찜 등록
  createDibs = async (user_id, store_id) => {
    const createDibsData = await Dibs.create({
      user_id,
      store_id,
    });
    console.log(createDibsData);
    return createDibsData;
  };

  //찜 삭제
  deleteDibs = async (store_id, user_id) => {
    const deleteDibsData = await Dibs.destroy({
      where: { store_id, user_id },
    });

    return deleteDibsData;
  };
}

module.exports = DibsRepository;
