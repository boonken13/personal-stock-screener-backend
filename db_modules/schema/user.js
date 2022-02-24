const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // player name
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = userSchema;