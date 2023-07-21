const express = require('express');
const {
  renderMain,
  renderLoading,
  renderOrderpage,
} = require('../controllers/page_controller');

const router = express.Router();

router.get('/main', renderMain);
router.get('/', renderLoading);
router.get('/order', renderOrderpage);

module.exports = router;
