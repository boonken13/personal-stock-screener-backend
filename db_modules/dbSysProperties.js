const mongoose = require('mongoose');
const db_screenerdb = require('./connection/dbConnections');
let counterSchema = require('./schema/counter');

let counterModel = db_screenerdb.model('counter', counterSchema, 'counter');

let dbSysProperties = {
    collection_counter: counterModel
}

module.exports = dbSysProperties;