const mongoose = require("mongoose");
const env = require("../../config/env").config();
const screenerdb = env.db.screenerDBUrl;

const dbConnections = {
  createConnection: (dbURL, callback) => {
    // Database connect options
    let options = {
      keepAlive: 1,
      connectTimeoutMS: 45000,
      socketTimeoutMS: 60000,
      retryWrites: true,
      readConcern: { level: "local" },
      useNewUrlParser: true,
    };
    // to be encrypt
    mongoose.set("maxTimeMS", 1800000);
    let db = mongoose.createConnection(dbURL.concat("/screenerdb"), options);

    db.on("error", function (err) {
      console.error(dbURL, String(err));
    });

    db.once("open", function () {
      // DO NOT REMOVE - To ensure DB connection
      console.log("Mongoose connected to " + dbURL);

      if (callback) {
        callback();
      }
    });

    return db;
  },
};

let db_screenerdb = dbConnections.createConnection(screenerdb, null);

module.exports = {db_screenerdb};
