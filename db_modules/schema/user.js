const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // player name
    email: {type: String, required: true},
    password: {type: String, required: true},
    userId: {type: Number, index: true},
    registrationDate: {type:Date, default: Date.now},
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    address: {type: String, default: ""},
    city : {type: String, default: ""},
    country: {type: String, default: ""},
    postal: {type: String, default: ""},
    aboutMe: {type: String, default: ""}

});

module.exports = userSchema;