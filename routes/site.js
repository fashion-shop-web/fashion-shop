const express = require('express');
const router = express.Router();

const siteController = require('../Controller/SiteController');

router.get('/contact', siteController.contactPage);
router.get('/signup', siteController.signupPage);
router.get('/login', siteController.loginPage);
router.get('/', siteController.homePage);


module.exports = router;