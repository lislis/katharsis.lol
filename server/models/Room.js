var mongoose = require('mongoose'), Schema = mongoose.Schema;

var RoomSchema = new mongoose.Schema({
    room_name: String,
    //private: Boolean,
    //main: Boolean,
    //allowed_users:
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', RoomSchema);
