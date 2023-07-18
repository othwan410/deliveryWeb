const express = require('express');
const router = express.Router();
const authRouter = require('./auth');

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
