const express = require('express');
const router = express.Router();

const productController = require('../Controller/ProductController');

router.get('/men', productController.menList);
router.get('/women', productController.womenList);
router.get('/sale', productController.saleList);
router.get('/:slug', productController.showDetail);

module.exports = router;