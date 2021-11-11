const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new mongoose.Schema({
  name: { type: String, default: ''},
  bio: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  img_url: String,
  hasPermission: { type: Boolean, default: false },
  colorCode: { type: String, default: '#ffffff' },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Character', CharacterSchema);
