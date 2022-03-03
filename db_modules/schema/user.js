const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const counterManager = require('../counterManager');

const userSchema = new Schema({
    // player name
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userId: {type: String, index: true}
});

userSchema.pre('save', counterManager.incrementAndGetCounter('userId'));

module.exports = userSchema;