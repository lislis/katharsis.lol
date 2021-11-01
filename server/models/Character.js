const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new mongoose.Schema({
  name: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  img_url: String,
  colorCode: { type: String, default: '#ffffff' },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Character', CharacterSchema);
