const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cart = new Schema({
    userID: { type: String, required: true },
    products: { type: Array, default: [] },
    total: { type: Number, default: 0 },
    ship: { type: Number, default: 5 }
});

module.exports = mongoose.model('cart', cart);