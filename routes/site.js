const express = require('express');
const router = express.Router();

const siteController = require('../Controller/SiteController');

router.use('/contact', siteController.contactPage);
router.use('/signup', siteController.signupPage);
router.use('/login', siteController.loginPage);
router.use('/', siteController.homePage);


module.exports = router;