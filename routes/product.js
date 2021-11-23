const express = require('express');
const router = express.Router();

/* GET product page. */
router.get('/men', function (req, res, next) {
    res.render('product/men');
});

router.get('/women', function (req, res, next) {
    res.render('product/women');
});

router.get('/kid', function (req, res, next) {
    res.render('product/kid');
});

router.get('/', function (req, res, next) {
    res.render('product/product');
});

module.exports = router;