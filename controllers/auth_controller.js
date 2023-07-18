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
  if (!res.locals.isLoggedIn) {
    return res.status(400).json({ errorMessege: '로그인한 상태입니다.' });
  }
  res.crearCookie('authorization');
  res.redirect('/');
};

exports.kakaoAuth = () => {
  passport.authenticate('kakao');
};

exports.kakaoCallback = (req, res) => {
  passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
  });

  res.redirect('/');
};
