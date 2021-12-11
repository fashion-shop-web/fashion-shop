const express = require('express');
const router = express.Router();
const loginController = require('../Controller/LoginController');


//sign up
router.get('/signup', loginController.signupPage);
router.post('/signup', loginController.register);

//verify after resgister
router.get('/verify/:emailToken', loginController.activeNewAccount)
router.get('/verify', loginController.verifyPage);

//forget password
router.get('/forget', loginController.forgetPasswordPage)
router.post('/forget', loginController.sendNewPassword);

router.get('/', loginController.loginPage);
router.post('/', loginController.authenticate);

module.exports = router;