const localConfig = {
    mode: "local",
    db: {
        screenerDBUrl: process.env.MONGO_URI || "localhost:27017/screenerdb"
    }
}

const env = {
    mode: process.env.NODE_ENV || "local",

    config: () => {
        switch (this.mode) {
            case "local":
            default:
                return localConfig;
        }
    }
}

module.exports = env;