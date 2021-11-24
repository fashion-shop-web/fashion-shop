const express = require('express');
const router = express.Router();

const AdminController = require('../Controller/AdminController')

/* GET customer page for admin */
router.use('/order', AdminController.showListOrder);
router.use('/customer', AdminController.showListUser);

module.exports = router;
