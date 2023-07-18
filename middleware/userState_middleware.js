exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.isLoggedIn = true;
    next();
  } else {
    res.locals.isLoggedIn = false;
    next();
  }
};
