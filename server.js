const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

const mongoDb = require('./db_modules/dbProperties');


const app = express();

const whitelist = ['http://localhost:3001', 'http://localhost:8080'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
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
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res)})
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res)})

app.listen(3001, ()=> {
  console.log('app is running on port 3001');
})
