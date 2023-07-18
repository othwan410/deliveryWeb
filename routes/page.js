const express = require('express');
const { renderMain } = require('../controllers/page_controller');

const router = express.Router();

router.get('/', renderMain);

module.exports = router;
