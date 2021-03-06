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
  username: {
    type: String,
    unique: true
  }
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

/* app.post('/users/', (req, res) => {
  console.log('CREATES USER OR USERS');

  const errors = [];

  const Bah = req.body;
  Bah.forEach(user => {
    const valid = userSchema.validate(user);
    if (valid.error) {
      errors.push(valid.error);
    }
    if (errors.length > 0) {
      res.status(500).json({ error: errors });
    } else {
      const usernames = Bah.map(user => user.username);
      console.log(usernames)
      const data = User.find({ username: { $in: usernames } });
      if (data && data.length > 0) {
        const unsavedUsers = data.map(user => {
          return { username: user.username, saved: false, reason: 'Username already taken' };
        }).filter(e => e);
        res.status(500).json([...unsavedUsers]);
      } else {
        const newUser = new User(user);
        newUser.save();
        res.status(200).json({ Success: 'All users have been saved' });
      };
    };
  });
}); */

/*
  1. validate data using joi
  2. if invalid respond with errors
  3. else save users
*/

app.post('/users/', (req, res) => {
  const body = req.body;
  const errors = [];

  body.forEach(user => {
    const valid = userSchema.validate(user);
    if (valid.error) {
      errors.push(valid.error);
    }
  });

  if (errors.length > 0) {
    res.status(500).json(errors);
  } else {
    User.insertMany(body, (err, data) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json(data);
      }
    });
  }
});

app.listen(PORT, () => console.log(`APP listens on port ${PORT}`));
