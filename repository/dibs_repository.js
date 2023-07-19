const { User, Store, Dibs } = require('../models');

class DibsRepository {
  dibsStore = async (userId, storeId) => {
    const user = await User.findByPk(userId);
    // const store = await Store.findByPk(storeId);

    // const isExistLikedUser = await user.addLiked(store, { through: Dibs });

    return user;
  };

  // findDibsList = async (userId) => {
  //     const user = await User.findByPk(userId);

  //     const dibsList = await user.getLiked({
  //         include: [
  //             {
  //                 model:
  //             }
  //         ]
  //     })

  //     const dibsList = await Dibs.findAll({
  //         attritubes: ['name', 'img_url', 'rating'],
  //         where: {user_id: }
  //     })
  // }
}

module.exports = DibsRepository;
