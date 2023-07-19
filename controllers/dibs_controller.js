const DibsService = require('../service/dibs_service');

class DibsController {
  dibsService = new DibsService();

  dibsStore = async (req, res) => {
    const { userId } = res.locals.user;

    const user = this.dibsService.dibsStore(userId);

    return res.status(200).json({ user });
  };
}
