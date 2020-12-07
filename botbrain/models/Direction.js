var mongoose = require('mongoose'), Schema = mongoose.Schema;

var DirectionSchema = new mongoose.Schema({
    text: { type: String },
    direction_type: { type: String },
    numerus: { type: String, enum: ['singular', 'plural']},
    flavor: { type: String },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Direction', DirectionSchema);
