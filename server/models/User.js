const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: String,
  isMod: { type: Boolean, default: false },
  colorCode: { type: String, default: '#ffffff' },
  ticketCodeId: {type: Schema.Types.ObjectId, ref: 'TicketCode'},
  character: { type: Schema.Types.ObjectId, ref: 'Character'},
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
