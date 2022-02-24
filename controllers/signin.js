const mongoDb = require("./../db_modules/dbProperties");
const jwt = require('jsonwebtoken');
// Redis Setup
const redis = require('redis');
// You will want to update your host to the proper address in production
const redisClient = redis.createClient(process.env.REDIS_URI);

const signin = {
  signToken: (username) => {
    const jwtPayload = { username };
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
    if (!user || !user.id) {
      return Promise.reject("Incorrect form submission");
    }
    const token = signToken(user.id);
    return setToken(token, user.id)
      .then(
        () => {
          return { success: 'true', userId: token, user: user.id };
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
            return { id: user.email };
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
    return authorization ? getAuthTokenId(req, res)
      : handleSignin(bcrypt, req, res)
        .then(data =>
          data && data.id ? createSession(data) : Promise.reject(data))
        .then(session => res.status(200).json(session))
        .catch(err => res.status(400).json(err));
  }

}


module.exports = signin;