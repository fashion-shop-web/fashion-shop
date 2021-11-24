const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');

router.use('/checkout', userController.checkOut);
router.use('/password', userController.changePassword);
router.use('/history', userController.historyList);
router.use('/arriving', userController.arrivingList);
router.use('/', userController.updateInformation);

module.exports = router;