var mongoose = require('mongoose'), Schema = mongoose.Schema;

var DirectionSchema = new mongoose.Schema({
    text: { type: String },
    type: { type: String,
            enum : ['character','scene', 'direction'],
            default: 'direction'
          },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Direction', DirectionSchema);
