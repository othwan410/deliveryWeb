const express = require('express');
const { Store, Menu } = require('../models');
const router = express.Router();

const StoresController = require('../controllers/store_controller');
const storesController = new StoresController();
const { authorizated } = require('../middleware/userState_middleware');

router.post('/stores', authorizated, storesController.createStore);
router.put('/stores/:store_id', authorizated, storesController.updateStore);
router.delete('/stores/:store_id', authorizated, storesController.deleteStore);
router.get('/stores', storesController.readStore);

router.get('/stores/detail', storesController.readDetailStore);

router.post(
  '/stores/:store_id/menu',
  authorizated,
  storesController.createMenu
);
router.put(
  '/stores/:store_id/menu/:menu_id',
  authorizated,
  storesController.updateMenu
);
router.delete(
  '/stores/:store_id/menu/:menu_id',
  authorizated,
  storesController.deleteMenu
);

//
router.get('/search', storesController.findAllName);

module.exports = router;
