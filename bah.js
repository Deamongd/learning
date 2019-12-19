const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

app.use(bodyParser.json());

const User = mongoose.model('Users', {
  name: String,
  email: String,
  birthday: Date,
  password: String,
  username: String
});

const userSchema = Joi.object({
  name: Joi.string().required().min(3).max(220),
  email: Joi.string().email().required(),
  birthday: Joi.date(),
  password: Joi.string(),
  password2: Joi.string().valid(Joi.ref('password')),
  username: Joi.string().required(),
  idd: Joi.any()
});

app.post('/users/', (req, res) => {
  console.log('CREATES USER OR USERS', req.body);

  const rbody = req.body;
  const usernames = rbody.map(user => user.username);
  User.find({ username: { $in: usernames } }).then(data => {
    const unsavedUsers = data.map(user => {
      return { username: user.username, saved: false, reason: 'Username already taken' };
    }).filter(e => e);
    const savedUsers = usernames.map(user => {
      if (unsavedUsers.find(u => u.username === user.username)) {
        return { username: user.username, saved: true };
      }
    }).filter(e => e);
    res.status(200).json([...unsavedUsers, ...savedUsers]);
  });
});

app.listen(PORT, () => console.log(`APP listens on port ${PORT}`));

/* app.post('/users/', (req, res) => {
  console.log('CREATES USER OR USERS', /* req.body );

  const errors = [];

  const rbody = req.body;
  const usernames = rbody.map(user => user.username);
  User.find({ username: { $in: usernames } }).then(data => {
    if (data && data.length >= 0) {
      res.json({ error: 'usernames: "' + data.map(user => user.username) + '" are already taken' });
    } else {
      console.log('blah');
    }
  });
}); */