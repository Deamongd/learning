const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Joi = require('@hapi/joi')
const PORT = 3000;

mongoose.connect('mongodb://localhost/stuff', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

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

app.use(bodyParser.json());

const SUCCESS = 'success';
// const ERROR = 'error';

app.get('/users/', (req, res) => {
  console.log('all USERS');
  User.find({})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

app.get('/users/:id', (req, res) => {
  console.log('specific USER');
  res.json({ status: SUCCESS, id: req.body.id });
  // Responds with single user JSON with status code 200 or ERROR
});

app.post('/users/', (req, res) => {
  console.log('CREATES USER OR USERS', req.body);

  const errors = [];

  req.body.forEach(user => {
    const valid = userSchema.validate(user);
    if (valid.error) {
      errors.push(valid.error);
      console.log('blah');
    } else {
      const newUser = new User(user);
      newUser.save((err, res) => {
        if (err) console.log("err");
        else console.log(res);
      });
    }
  });

  if (errors.length > 0) {
    res.status(500).json({ error: errors });
  } else {
    res.status(200).json(req.body);
  }
});

app.put('/users/', (req, res) => {
  console.log('UPDATES USER OR USERS (or creates if not created)');
  res.json({ status: SUCCESS });
  // RESPONDS with updated/created users or user JSON with status code 200 or ERROR
});

app.delete('/users/', (req, res) => {
  console.log('Deletes user or users');
  res.json({ status: SUCCESS });
  // RESPONDS WITH SUCCESS with status code 200 or ERROR
});

// GET, POST, PUT, UPDATE, DELETE, ....
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// https://en.wikipedia.org/wiki/Representational_state_transfer

app.listen(PORT, () => console.log(`APP listens on port ${PORT}`));