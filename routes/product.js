const express = require('express');
const router = express.Router();

const productController = require('../Controller/ProductController');

router.use('/men', productController.menList);
router.use('/women', productController.womenList);
router.use('/sale', productController.saleList);
router.use('/', productController.showDetail);

module.exports = router;