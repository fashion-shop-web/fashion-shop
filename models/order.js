const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order = new Schema({
    id: ObjectId,
    userId: { type: String, required: true },
    status: { type: String, required: true },
    process: { type: Array, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('order', order);