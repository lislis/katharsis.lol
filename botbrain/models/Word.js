const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new mongoose.Schema({
    text: { type: String },
    word_type: { type: String },
    flavor: { type: String },
    numerus: {
        type: String,
        enum: ['singular', 'plural']
    },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Word', WordSchema);
