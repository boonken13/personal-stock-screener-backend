const localConfig = {
    mode: "local",
    db: {
        screenerDBUrl: process.env.MONGO_URI || "mongodb://localhost:27017"
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