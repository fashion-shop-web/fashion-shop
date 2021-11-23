const express = require('express');
const router = express.Router();

//all user features
router.get('/checkout', function (req, res, next) {
    res.render('user/checkout');
})

router.get('/password', function (req, res, next) {
    res.render('user/password');
})

router.get('/history', function (req, res, next) {
    res.render('user/history');
})

router.get('/arriving', function (req, res, next) {
    res.render('user/arriving');
})

router.get('/', function (req, res, next) {
    res.render('user/user');
})

module.exports = router;