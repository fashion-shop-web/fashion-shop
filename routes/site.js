const express = require('express');
const router = express.Router();

const siteController = require('../Controller/SiteController');

router.get('/checkout', siteController.checkOut);
router.get('/contact', siteController.contactPage);
router.get('/advancesearch', siteController.advanceSearchPage);
router.get('/', siteController.homePage);


module.exports = router;