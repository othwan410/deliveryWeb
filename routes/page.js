const express = require('express');
const {
  renderMain,
  renderLoading,
  renderOrderComplete,
  renderRegistor,
  renderAdminpage,
  renderCreateMenuPage
} = require('../controllers/page_controller');

const router = express.Router();

router.get('/main', renderMain);
router.get('/', renderLoading);
router.get('/orderComplete', renderOrderComplete);
router.get('/store_create', renderRegistor);
router.get('/adminpage', renderAdminpage);
router.get('/menu_create', renderCreateMenuPage);

module.exports = router;
