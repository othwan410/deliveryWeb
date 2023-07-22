const express = require('express');
const {
  renderMain,
  renderLoading,
  renderOrderComplete,
  renderRegistor,
  renderJoin,
  renderSignIn,
} = require('../controllers/page_controller');

const router = express.Router();

router.get('/main', renderMain);
router.get('/', renderLoading);
router.get('/orderComplete', renderOrderComplete);
router.get('/store_create', renderRegistor);
router.get('/join', renderJoin);
router.get('/signin', renderSignIn);

module.exports = router;
