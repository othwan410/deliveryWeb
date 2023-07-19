const jwt = require('jsonwebtoken');
const { Users } = require('../models');

exports.authorizated = async (req, res, next) => {
  const { authorization } = req.cookies;
  const [authType, authToken] = (authorization ?? '').split(' ');

  if (!authorization) {
    return res.status(403).json({ errorMessage: '권한이 존재하지 않습니다.' });
  }

  if (authType !== 'Bearer' || !authToken) {
    return res.status(403).json({ errorMessage: '로그인이 필요한 기능입니다' });
  }

  try {
    const { userId } = jwt.verify(authToken, 'costomized-secret-key');
    console.log(userId);

    const user = await Users.findOne({
      where: userId,
    });
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  const { authorization } = req.cookies;
  const [authType, authToken] = (authorization ?? '').split(' ');

  if (!authorization || authType !== 'Bearer' || !authToken) {
    res.locals.isLoggedIn = false;
    next();
    return;
  }

  res.locals.isLoggedIn = true;
  next();
};
