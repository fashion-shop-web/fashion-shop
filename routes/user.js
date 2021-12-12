const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');

//change password
router.get('/password', userController.changePassword);
router.post('/password/:id', userController.storeNewPass);

//check out
router.post('/checkout/:id', userController.createOrder);


router.get('/history', userController.historyList);
router.get('/arriving', userController.arrivingList);

//log out
router.get('/logout', userController.logOut);

//update information
router.post('/:id', userController.storeUpdateInformation);
router.get('/', userController.updateInformation);

module.exports = router;