const { Dibs, sequelize } = require('../models');

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

  //내가 찜한 가게 조회
  findMyDibs = async (query) => {
    try {
      const myDibs = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      return myDibs;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = DibsRepository;
