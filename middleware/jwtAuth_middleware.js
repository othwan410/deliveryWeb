const passport = require('passport');

exports.jwtAuthMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: '로그인이 필요한 기능입니다.' });
    }
    res.locals.user = user;
    res.json({ result: true });
  })(req, res, next);
};
//
