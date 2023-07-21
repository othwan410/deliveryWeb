const express = require('express');
const {
  renderMain,
  renderLoading,
  renderOrderpage,
  renderRegistor,
} = require('../controllers/page_controller');

const router = express.Router();

router.get('/main', renderMain);
router.get('/', renderLoading);
router.get('/store_create', renderRegistor);

module.exports = router;
