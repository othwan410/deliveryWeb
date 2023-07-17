const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.loginController = async (req, res, next) => {
  try {
    passport.authenticate('local', (passportError, user, info) => {
      if (passportError || !user) {
        return res.status(400).json({ message: info.reason });
      }
      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          return res.status(400).json({ errorMessage: loginError });
        }
        const token = jwt.sign(
          { userId: user.userId },
          process.env.COOKIE_SECRET
        );
        res.json({ token });
        return res.status(200).json({ message: '로그인에 성공하였습니다.' });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.logoutController = (req, res) => {
  //로그아웃 기능 구현
  //session 사용 없이 jwt토큰으로 인증 구현했기 때문에  jwt 토큰 제거방식으로
  //프론트단에 false 반환 예정
};
