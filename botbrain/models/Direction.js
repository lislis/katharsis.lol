var mongoose = require('mongoose'), Schema = mongoose.Schema;

var DirectionSchema = new mongoose.Schema({
    text: { type: String },
    direction_type: {
        type: String,
        enum: ['nonuser', 'user', 'setting'],
        default: 'nonuser'
    },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Direction', DirectionSchema);
