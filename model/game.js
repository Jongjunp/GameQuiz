//mongoose object declaration
const { Int32 } = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    gametype: {
        type: String,
        required: true
    },
    gameid: {
        type: String,
        required: true,
        unique: true
    },
    gameprob: {
        type: String,
        required: true
    },
    gamehint1: {
        type: String,
        required: true
    },
    gamehint2: {
        type: String,
        required: true
    },
    gamehint3: {
        type: String,
        required: true
    },
    gameanswer: {
        type: String,
        required: true
    },
    gamename: {
        type: String,
        required: true
    },
    gameshortdescription: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('game', gameSchema);