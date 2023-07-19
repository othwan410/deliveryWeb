const DibsRepository = require('../repository/dibs_repository');

class DibsService {
  dibsRepository = new DibsRepository(userId);

  dibsStore = async (userId) => {
    const user = this.dibsRepository.dibsStore(userId);

    return user;
  };
}
