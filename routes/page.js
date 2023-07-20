const express = require('express');
const { renderMain, renderLoading } = require('../controllers/page_controller');

const router = express.Router();

router.get('/main', renderMain);
router.get('/', renderLoading);

module.exports = router;
