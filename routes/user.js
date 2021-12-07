const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');

//change password
router.get('/password', userController.changePassword);
router.post('/password/:id', userController.storeNewPass);

router.get('/history', userController.historyList);
router.get('/arriving', userController.arrivingList);
router.get('/logout', userController.logOut);

//update information
router.post('/:id', userController.storeUpdateInformation);
router.get('/', userController.updateInformation);

module.exports = router;