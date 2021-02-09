const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    key: String,
    value: String,
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Setting', SettingsSchema);
