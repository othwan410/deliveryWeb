const UserService = require('../services/user_service');

class UserController {
  userService = new UserService();

  //유저 정보 조회
  findUser = async (req, res) => {
    const userId = res.locals.user_id;

    await this.userService
      .findUser(userId)
      .then((user) => {
        // return res.status(200).json({ user });
        res.render('profile', { user: user[0] });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };

  //오더 페이지에 들어갈 유저 잔액 및 주소
  findUserForOrder = async (req, res) => {
    const user_id = res.locals.user_id;

    await this.userService
      .findUserForOrder(user_id)
      .then((user) => {
        console.log(...user);
        return res.render('order', ...user);
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };

  //유저 정보 수정
  updateUser = async (req, res) => {
    const userId = res.locals.user_id;
    const { nickname } = req.body;

    await this.userService
      .updateUser(userId, nickname)
      .then(() => {
        return res.status(200).json({ message: '유저 정보가 수정되었습니다.' });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };

  //유저 탈퇴
  deleteUser = async (req, res) => {
    const userId = res.locals.user_id;
    const { password } = req.body;

    await this.userService
      .deleteUser(userId, password)
      .then(() => {
        res.clearCookie('authorization');

        return res.status(200).json({ message: '유저 정보가 삭제되었습니다.' });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ errorMessage: error.errorMessage });
      });
  };
}

module.exports = UserController;
