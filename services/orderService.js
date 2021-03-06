const order = require('../models/order')
const cartService = require('../services/cartService')

const createNewOrder = async (userID, content, products) => {
    try {
        const process = [];
        const status = 'pending';
        process.push({ status, date: Date.now() })
        const cart = await cartService.getCartByUserID(userID);
        order.create({ userID, ...content, status, process, products, ship: cart.ship, total: cart.total })
    } catch (err) {
        console.log(err);
    }
}

const getAllOrder = async (userID) => {
    try {
        const orders = await order.find({ userID: userID }).lean();
        return orders;
    } catch (err) {
        console.log(err);
    }
}

const cancleOrder = async (orderID) => {
    try {
        const userOrder = await order.findOne({ _id: orderID });
        userOrder.status = 'cancel';
        const aProcess = { status: 'cancel', date: Date.now() }
        userOrder.process.push(aProcess);
        await userOrder.save();
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    createNewOrder,
    getAllOrder,
    cancleOrder
}