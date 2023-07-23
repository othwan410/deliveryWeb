const express = require('express');
const router = express.Router();

const StoresController = require('../controllers/store_controller');
const storesController = new StoresController();
const {
  authorizated,
  isLoggedIn,
} = require('../middleware/userState_middleware');

router.post('/stores', authorizated, storesController.createStore);
router.put('/stores/:store_id', authorizated, storesController.updateStore);
router.delete('/stores/:store_id', authorizated, storesController.deleteStore);
router.get('/stores', storesController.readStore);

router.get('/stores/detail', isLoggedIn, storesController.readDetailStore);

router.get('/keyword', storesController.readStoreByKeyword);

router.get('/getStoreId', authorizated, storesController.readStoreId)

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

//가게이름, 메뉴이름
router.get('/searchStore/:store_id', storesController.findStoreName);
router.get('/searchMenu/:store_id', storesController.findAllMenuName);

module.exports = router;
