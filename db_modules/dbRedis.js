const redis = require("redis");
// You will want to update your host to the proper address in production
const redisClient = redis.createClient(process.env.REDIS_URI);

const dbRedis = {
  getRedisClient: () => {
    return redisClient ? redisClient : undefined;
  },
};

module.exports = dbRedis;
