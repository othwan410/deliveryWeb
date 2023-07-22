const express = require('express');
const {
  renderMain,
  renderLoading,
  renderOrderComplete,
  renderRegistor,
} = require('../controllers/page_controller');
const { isLoggedIn } = require('../middleware/userState_middleware');

const router = express.Router();

router.get('/main', isLoggedIn, renderMain);
router.get('/', renderLoading);
router.get('/orderComplete', renderOrderComplete);
router.get('/store_create', renderRegistor);

module.exports = router;
