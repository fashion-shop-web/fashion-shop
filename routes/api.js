const express = require('express');
const router = express.Router();

const ApiController = require('../Controller/ApiController');

//comment api
router.post('/comment/:productID', ApiController.storeComment);

//cart api
router.post('/cart/:productID', ApiController.addCart);
router.delete('/cart/:productID', ApiController.deleteCart);

module.exports = router;