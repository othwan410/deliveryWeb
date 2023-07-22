const express = require('express');
const {
  renderMain,
  renderLoading,
  renderJoin,
  renderSignIn,
} = require('../controllers/page_controller');

const router = express.Router();

router.get('/main', renderMain);
router.get('/', renderLoading);
router.get('/join', renderJoin);
router.get('/signin', renderSignIn);

module.exports = router;
