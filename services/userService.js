const user = require('../models/user');
const product = require('../models/product');
const cartService = require('../services/cartService');
const orderService = require('../services/orderService');
const bcrypt = require('bcrypt');
const order = require('../models/order');

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

const getHistory = async (id) => {
    try {
        let orders = await orderService.getAllOrder(id);
        orders = orders.filter(item => (item.status === 'received' || item.status === 'cancel'));
        if (orders.length !== 0) {
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].status !== 'cancel') {
                    const receivedDate = new Date(orders[i].updatedAt);
                    let day = ("0" + receivedDate.getDate()).slice(-2);
                    let month = ("0" + (receivedDate.getMonth() + 1)).slice(-2);
                    let year = receivedDate.getFullYear();
                    let hour = ("0" + receivedDate.getHours()).slice(-2);;
                    let minute = ("0" + receivedDate.getMinutes()).slice(-2);;
                    let second = ("0" + receivedDate.getSeconds()).slice(-2);;
                    orders[i].receivedDate = day + '/' + month + '/' + year;
                    orders[i].receivedTime = hour + ':' + minute + ':' + second;
                }

                const checkoutDate = new Date(orders[i].createdAt);
                day = ("0" + checkoutDate.getDate()).slice(-2);
                month = ("0" + (checkoutDate.getMonth() + 1)).slice(-2);
                year = checkoutDate.getFullYear();
                hour = ("0" + checkoutDate.getHours()).slice(-2);;
                minute = ("0" + checkoutDate.getMinutes()).slice(-2);;
                second = ("0" + checkoutDate.getSeconds()).slice(-2);;
                orders[i].checkoutDate = day + '/' + month + '/' + year;
                orders[i].checkoutTime = hour + ':' + minute + ':' + second;

                orders[i].detailProduct = [];

                for (let j = 0; j < orders[i].products.length; j++) {
                    const aProduct = await product.findOne({ _id: orders[i].products[j].substring(orders[i].products[j].indexOf('-') + 1, orders[i].products[j].length) })
                    orders[i].detailProduct.push(aProduct);
                }
            }
        }

        return orders.reverse();
    } catch (err) {
        console.log(err);
    }
}

const getArriving = async (id) => {
    try {
        let orders = await orderService.getAllOrder(id);
        orders = orders.filter(item => (item.status !== 'received' && item.status !== 'cancel'));
        if (orders.length !== 0) {
            for (let i = 0; i < orders.length; i++) {

                const checkoutDate = new Date(orders[i].createdAt);
                day = ("0" + checkoutDate.getDate()).slice(-2);
                month = ("0" + (checkoutDate.getMonth() + 1)).slice(-2);
                year = checkoutDate.getFullYear();
                hour = ("0" + checkoutDate.getHours()).slice(-2);;
                minute = ("0" + checkoutDate.getMinutes()).slice(-2);;
                second = ("0" + checkoutDate.getSeconds()).slice(-2);;
                orders[i].checkoutDate = day + '/' + month + '/' + year;
                orders[i].checkoutTime = hour + ':' + minute + ':' + second;

                orders[i].detailProduct = [];

                for (let j = 0; j < orders[i].products.length; j++) {
                    const aProduct = await product.findOne({ _id: orders[i].products[j].substring(orders[i].products[j].indexOf('-') + 1, orders[i].products[j].length) })
                    orders[i].detailProduct.push(aProduct);
                }
            }
        }

        return orders.reverse();
    } catch (err) {
        console.log(err);
    }

}

const cancleOrder = async (orderID) => {
    await orderService.cancleOrder(orderID);
}


module.exports = {
    updateInfo,
    getCustomer,
    validateChangePass,
    newOrder,
    getHistory,
    getArriving,
    cancleOrder
}