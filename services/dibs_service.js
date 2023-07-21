const DibsRepository = require('../repositories/dibs_repository');

class DibsService {
  dibsRepository = new DibsRepository();

  createDibs = async (user_id, store_id) => {
    return await this.dibsRepository.createDibs(user_id, store_id);
  };

  deleteDibs = async (user_id, store_id) => {
    return await this.dibsRepository.deleteDibs(user_id, store_id);
  };
}

module.exports = DibsService;
