const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const storeRouter = require('./store');
const pageRouter = require('./page');
const dibsRouter = require('./dibs');

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/',
    route: storeRouter,
  },
  {
    path: '/',
    route: pageRouter,
  },
  {
    path: '/',
    route: dibsRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
