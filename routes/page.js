const express = require('express');
const {
  renderMain,
  renderLoading,
  renderOrderComplete,
  renderRegistor,
  renderJoin,
  renderSignIn,
  renderProfile,
} = require('../controllers/page_controller');
const { isLoggedIn } = require('../middleware/userState_middleware');

const router = express.Router();

router.get('/main', isLoggedIn, renderMain);
router.get('/', renderLoading);
router.get('/orderComplete', renderOrderComplete);
router.get('/store_create', renderRegistor);
router.get('/join', renderJoin);
router.get('/signin', renderSignIn);
router.get('/profile', renderProfile);

module.exports = router;
