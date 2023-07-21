const express = require('express');
const {
  renderMain,
  renderLoading,
  renderOrderComplete,
} = require('../controllers/page_controller');

const router = express.Router();

router.get('/main', renderMain);
router.get('/', renderLoading);
router.get('/orderComplete', renderOrderComplete);
router.get('/store_create', renderRegistor);

module.exports = router;
