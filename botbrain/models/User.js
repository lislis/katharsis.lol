var mongoose = require('mongoose'), Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    nickname: String,
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
