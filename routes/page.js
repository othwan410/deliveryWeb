const express = require('express');
const AddressController = require('../controllers/address_controller');
const {
  renderMain,
  renderLoading,
  renderOrderComplete,
  renderRegistor,
  renderAdminpage,
  renderCreateMenuPage,
  renderJoin,
  renderSignIn,
  renderProfile,
} = require('../controllers/page_controller');
const addressController = new AddressController();

const { isLoggedIn } = require('../middleware/userState_middleware');

const router = express.Router();

//메인 접속시 렌더링되는 ' 유저가 설정한 최근주소'와 '유저가 등록한 모든 주소들 조회'
router.get('/main', isLoggedIn, addressController.findCurrentAddress);
router.get('/', renderLoading);
router.get('/orderComplete', renderOrderComplete);
router.get('/store_create', renderRegistor);
router.get('/adminpage', renderAdminpage);
router.get('/menu_create', renderCreateMenuPage);
router.get('/join', renderJoin);
router.get('/signin', renderSignIn);
// router.get('/profile', renderProfile);

module.exports = router;
