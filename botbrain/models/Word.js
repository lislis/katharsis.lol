var mongoose = require('mongoose'), Schema = mongoose.Schema;

var WordSchema = new mongoose.Schema({
    text: { type: String },
    word_type: {
        type: String,
        enum: ['verb', 'adjective', 'adverb', 'noun']
    },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Word', WordSchema);
