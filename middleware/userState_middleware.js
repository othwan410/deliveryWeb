exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenicated()) {
    res.locals.isLoggedIn = true;
    next();
  } else {
    res.locals.isLoggedIn = false;
    next();
  }
};
