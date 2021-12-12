const user = require('../models/user');
const cartService = require('../services/cartService');
const orderService = require('../services/orderService');
const bcrypt = require('bcrypt');

const updateInfo = async (id, newInfo) => {
    try {
        let customerEmail = await user.find({ email: newInfo.email });

        for (let i = 0; i < customerEmail.length; i++) {
            if (customerEmail[i]._id.toString() !== id) return 0;//duplicate email
        }

        await user.updateOne({ _id: id }, newInfo);
        return 1; //succcess
    } catch (err) {
        console.log(err);
    }
}

const getCustomer = async (id) => {
    try {
        const customer = await user.findOne({ _id: id });
        const cart = await cartService.getCartByUserID(id);
        customer.totalCart = cart.products.length;
        return customer;
    } catch (err) {
        console.log(err);
    }
}

const validateChangePass = async (id, pass) => {
    try {
        let customer = await user.findOne({ _id: id });

        if (!bcrypt.compareSync(pass.oldPassword, customer.password)) {
            return 1;  //wrong current password
        } else if (pass.oldPassword === pass.newPassword) {
            return 2; //change to old pass
        } else if (pass.newPassword.length < 8) {
            return 3; //pass too short   
        } else if (pass.newPassword !== pass.rePassword) {
            return 4; //retype invalid
        } else {
            customer.password = bcrypt.hashSync(pass.newPassword, 10);
            await customer.save();
            return 0; //success
        }
    } catch (err) {
        console.log(err);
    }
}

const newOrder = async (id, content) => {
    const cart = await cartService.getCartByUserID(id);
    if (cart.products.length !== 0) {
        const products = cart.products;
        content.note = content.note.trim();
        await orderService.createNewOrder(id, content, products);
        await cartService.removeAllCartItem(id);
        return 0; //checkout success
    } else return 1; //empty cart
}


module.exports = {
    updateInfo,
    getCustomer,
    validateChangePass,
    newOrder
}