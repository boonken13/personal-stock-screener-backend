const mongoDb = require("./../db_modules/dbProperties");
const jwt = require('jsonwebtoken');
// Redis Setup
const dbRedis = require('./../db_modules/dbRedis');
const redisClient = dbRedis.getRedisClient();

const signin = {
  signToken: (userId) => {
    const jwtPayload = { userId };
    return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days' });
  },

  setToken: (key, value) => {
    return Promise.resolve(redisClient.set(key, value)).then(
      () => {
        return;
      },
      err => {
        return Promise.reject("Error inserting redis");
      }
    );
  },

  createSession: (user) => {
    if (!user || !user.userId) {
      return Promise.reject("Incorrect form submission");
    }
    const token = signin.signToken(user.userId);
    return signin.setToken(token, user.userId)
      .then(
        () => {
          return { success: 'true', token: token, userId: user.userId };
        },
        err => {
          return Promise.reject(err);
        }
      )
      .catch(err => err);
  },

  handleSignin: (bcrypt, req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return Promise.reject('incorrect form submission');
    }
    return mongoDb.collection_user.findOne({ email: email }).lean().then(
      user => {
        if (user) {
          let isValid = bcrypt.compareSync(password, user.password);
          if (isValid) {
            return { email: user.email , userId: user.userId};
          }
        } else {
          return Promise.reject("User not found");
        }
      },
      err => {
        return err;
      }
    )
  },

  getAuthTokenId: (req, res) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization.replace("Bearer ", ""), (err, reply) => {
      if (err || !reply) {
        return res.status(401).send('Unauthorized');
      }
      console.log("Authorized for", reply);
      return res.json({ id: reply })
    });
  },

  signinAuthentication: (req, res, bcrypt) => {
    const { authorization } = req.headers;
    return authorization ? signin.getAuthTokenId(req, res)
      : signin.handleSignin(bcrypt, req, res)
        .then(data =>
          data && data.userId ? signin.createSession(data) : Promise.reject(data))
        .then(session => res.status(200).json(session))
        .catch(err => res.status(400).json(err));
  }

}


module.exports = signin;