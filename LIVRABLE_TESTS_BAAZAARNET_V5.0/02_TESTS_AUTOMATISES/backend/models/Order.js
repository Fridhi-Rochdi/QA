const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: String,
    items: [{ product: mongoose.Schema.Types.ObjectId, quantity: Number }],
    total: Number,
    status: { type: String, default: 'PENDING' }
});

module.exports = mongoose.model('Order', orderSchema);
