const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cart = new Schema({
    userID: { type: String, required: true },
    products: { type: Array, default: [] }
});

module.exports = mongoose.model('cart', cart);