const order = require('../models/order')

const createNewOrder = async (userID, content, products) => {
    try {
        const process = [];
        const status = 'pending';
        process.push({ status, date: Date.now() })
        order.create({ userID, ...content, status, process, products })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createNewOrder
}