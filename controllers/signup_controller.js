const User = require('../models/user');

const signupController = async (req, res, next) => {
  const { email, nickname, password, confirm } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  try {
    if (!email) {
      return res.status(400).json({ errorMessage: 'email을 입력해주세요' });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(412)
        .json({ errorMessage: '이메일 형식이 올바르지 않습니다.' });
    }
    if (!nickname) {
      return res.status(400).json({ errorMessage: 'nickname을 입력해 주세요' });
    }
    const exUser = await UserActivation.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    if (password !== confirm) {
      return res
        .status(400)
        .json({ error: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      eamil,
      nickname,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = signupController;
