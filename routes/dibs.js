const express = require('express');

const { authorizated } = require('../middleware/userState_middleware');
const DibsController = require('../controllers/dibs_controller');

const router = express.Router();

// router.get('/dibs', isLoggedIn, DibsController);

router.get('/dibs', authorizated, async (req, res) => {
  const user_id = res.locals.user_id;

  console.log(user_id);

  return res.status(200).json('성공');
});

module.exports = router;
