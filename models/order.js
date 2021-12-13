const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order = new Schema({
    id: ObjectId,
    userID: { type: String, required: true },
    products: { type: Array, required: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    payment: { type: String, required: true },
    note: { type: String },
    status: { type: String, required: true },
    process: { type: Array, required: true },
    ship: { type: Number, required: true },
    total: { type: Number, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('order', order);