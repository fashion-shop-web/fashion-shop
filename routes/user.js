const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');

router.get('/checkout', userController.checkOut);
router.get('/password', userController.changePassword);
router.get('/history', userController.historyList);
router.get('/arriving', userController.arrivingList);
router.get('/', userController.updateInformation);

module.exports = router;