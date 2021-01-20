const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectionSchema = new Schema({
    text: { type: String },
    direction_type: { type: String },
    numerus: { type: String, enum: ['singular', 'plural']},
    flavor: { type: String },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Direction', DirectionSchema);
