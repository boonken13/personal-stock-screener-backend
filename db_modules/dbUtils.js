const mongoDb = require("./dbProperties");

const dbUtils = {
    /**
     * Increments the DB counter and returns the latest value for the caller to use.
     *
     * @param {String} counterName
     * @returns {Promise}
     */
     incrementAndGetCounter: (counterName) => {
        return mongoDb.collection_counter.findByIdAndUpdate(
            { _id: counterName },
            { $inc: {seq: 1} },
            { upsert: true, new: true }
        ).then(
            counterDoc => {
                return counterDoc.seq
            }
        );
    },
}

module.exports = dbUtils;