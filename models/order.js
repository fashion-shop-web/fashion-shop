const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order = new Schema({
    id: ObjectId,
    userId: { type: String, required: true },
    status: { type: String, required: true },
    process: { type: Array, required: true },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('order', order);