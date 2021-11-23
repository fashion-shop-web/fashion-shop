const express = require('express');
const router = express.Router();

/* GET customer page for admin */
router.get('/order', function (req, res, next) {
    res.render('order');
})

router.get('/', function (req, res, next) {
    res.render('customer');
});

module.exports = router;
