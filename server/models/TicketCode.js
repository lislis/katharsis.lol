const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketCodeSchema = new mongoose.Schema({
    code: String,
    used: { type: Boolean, default: false },
    usedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TicketCode', TicketCodeSchema);
