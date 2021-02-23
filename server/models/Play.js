const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaySchema = new mongoose.Schema({
    the_play: String,
    title: String,
    comment: String,
    took_place: Date,
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Play', PlaySchema);
