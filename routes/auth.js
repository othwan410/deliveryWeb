const express = require('express');
const signupController = require('../controllers/signup_controller');
const {
  loginController,
  logoutController,
} = require('../controllers/auth_controller');
const { isLoggedIn } = require('../middleware/userState_middleware');
const { kakaoAuth, kakaoCallback } = require('../controllers/auth_controller');

const router = express.Router();

router.post('/join', signupController);

router.post('/login', loginController);

router.post('/logout', isLoggedIn, logoutController);

router.post('/kakao', isLoggedIn, kakaoAuth);

router.post('/kakao/callback', kakaoCallback);

module.exports = router;
