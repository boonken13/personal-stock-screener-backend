const mongoDb = require("./dbSysProperties");

const counterManager = {

    /**
     * Increments the DB counter and returns the latest value for the caller to use.
     *
     * @param {String} counterName
     * @returns {Promise}
     */
    incrementAndGetCounter: (counterName) => {
        console.log(__dirname);
        console.log(mongoDb, "bk");
        return mongoDb.collection_counter.findByIdAndUpdate(
            { _id: counterName },
            { $inc: {seq: 1} },
            { upsert: true, new: true }
        ).then(
            counterDoc => counterDoc.seq
        );
    },

};

module.exports = counterManager;