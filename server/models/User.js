const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nickname: String,
  hasPermission: { type: Boolean, default: false },
  isMod: { type: Boolean, default: false },
  colorCode: { type: String, default: '#ffffff' },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
