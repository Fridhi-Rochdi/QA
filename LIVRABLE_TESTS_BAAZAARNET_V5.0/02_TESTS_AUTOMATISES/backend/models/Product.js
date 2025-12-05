const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    description: String,
    category: String,
    seller: String,
    status: { type: String, default: 'AVAILABLE' }
});

module.exports = mongoose.model('Product', productSchema);
