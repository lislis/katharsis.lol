const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new mongoose.Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  character: { type: Schema.Types.ObjectId, ref: 'Character' },
  bot: { type: Boolean, default: false },
  message: String,
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', ChatSchema);
