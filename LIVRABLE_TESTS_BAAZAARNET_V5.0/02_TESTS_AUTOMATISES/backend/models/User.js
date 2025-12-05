const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'CLIENT' },
    isBanned: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
