const passport = require('passport');

exports.kakaoAuth = () => {
  passport.authenticate('kakao');
};

exports.kakaoCallback = (req, res) => {
  passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
  });

  res.redirect('/');
};
