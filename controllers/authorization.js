const dbRedis = require('./../db_modules/dbRedis');
const redisClient = dbRedis.getRedisClient();

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }
  console.log(authorization);
  return redisClient.get(authorization.replace("Bearer ", ""), (err, reply) => {
    if (err || !reply) {
      console.log(err, reply);
      return res.status(401).send('Unauthorized');
    }
    return next();
  });
};

module.exports = {
  requireAuth
}