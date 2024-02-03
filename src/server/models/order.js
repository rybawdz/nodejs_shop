const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const orderSchema = new mongoose.Schema({
    items: [orderItemSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: String,
    date: Date,
})

module.exports = mongoose.model('Order', orderSchema);