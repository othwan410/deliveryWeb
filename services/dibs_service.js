const DibsRepository = require('../repositories/dibs_repository');
const { User } = require('../models/user');
const { Store } = require('../models/store');
class DibsService {
  dibsRepository = new DibsRepository();

  updateDibs = async (user_id, store_id) => {
    const dibs = await this.dibsRepository.readDibs(user_id, store_id);

    if (dibs) {
      return await this.dibsRepository.deleteDibs(user_id, store_id);
    }
    if (dibs === null) {
      await this.dibsRepository.createDibs(user_id, store_id);
    }
  };
}
module.exports = DibsService;
