const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const auth = require('./controllers/authorization');

// const mongoDb = require('./db_modules/dbProperties');


const app = express();

const whitelist = ['http://localhost:3001', 'http://localhost:8080'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(morgan('combined'));
app.use(cors(corsOptions))
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.post('/signin', (req, res) => {signin.signinAuthentication(req, res, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt) })
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res)})
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res)})
// app.get("/test", (req, res) => {
//   res.status(200).send("Hello World!");
// });

// app.listen(3001, ()=> {
//   console.log('app is running on port 3001');
// })

module.exports = app;
