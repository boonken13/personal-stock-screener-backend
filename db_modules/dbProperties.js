const mongoose = require('mongoose');
const db_screenerdb = require('./connection/dbConnections');

let userSchema = require('./schema/user');
let userModel = db_screenerdb.model('user', userSchema, 'user');

let dbProperties = {
    collection_user: userModel
}

module.exports = dbProperties;