//mongoose object declaration
const { Int32 } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
    userscore: {
        type: String,
        required: true
    },
    userranking: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);