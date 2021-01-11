const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    nickname: String,
    hasPermission: { type: Boolean, default: false },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
