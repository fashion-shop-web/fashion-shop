const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cart = new Schema({
    id: ObjectId,
    product: { type: Array }
});

module.exports = mongoose.model('cart', cart);