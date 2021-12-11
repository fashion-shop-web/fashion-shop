const express = require('express');
const router = express.Router();

const ApiController = require('../Controller/ApiController');

router.post('/comment/:productID', ApiController.storeComment);


module.exports = router;