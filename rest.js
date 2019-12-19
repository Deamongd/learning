const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const User = mongoose.model('Users', { name: String, username: { type: String, unique: true }, password: String, birthday: Date });
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const SUCCESS = 'success';
const ERROR = 'error';

app.get('/users/', (req, res) => {
  console.log(`all USERS`);
  User.find({}).then(data => {
    console.log(data);
    if (data && data.length < 1) {
      res.status(404).json({ Status: 'No users found' })
    } else {
      res.status(200).json(data).catch(err => {
        res.status(500).json({ error: err });
      });
    }
  });
  // Responds with users JSON with status code 200 or ERROR
});

app.get('/users/:id', (req, res) => {
  console.log(`specific USER`);
  User.find({ _id: req.params.id }).then(data => {
    if (data && data.length < 1) {
      res.status(404).json({ response: 'Could not find user with entered ID' });
    } else {
      res.status(200).json({ data });
    }
  });
});

app.post('/users/', (req, res) => {
  console.log(`CREATES USER OR USERS`);
  User.find({ username: req.body.username }).then(data => {
    if (data) {
      res.status(403).json({ status: 'User witht that username already exists' });
    } else {
      if (req.body.password === req.body.password2) {
        const user = new User({
          name: req.body.name,
          birthday: req.body.birthday,
          username: req.body.username,
          password: req.body.password
        });
        user.save().then(() => res.status(200).json(data));
      } else {
        res.json({ status: 'One or more password and password2 do not match' });
      }
    }
  });
});

app.put('/users/', (req, res) => {
  console.log(`UPDATES USER OR USERS (or creates if not created)`);
  res.json({ status: SUCCESS });
  // RESPONDS with updated/created users or user JSON with status code 200 or ERROR
});

app.delete('/users/', (req, res) => {
  console.log(`Deletes user or users`);
  res.json({ status: SUCCESS });
  // RESPONDS WITH SUCCESS with status code 200 or ERROR
});

// GET, POST, PUT, UPDATE, DELETE, ....
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// https://en.wikipedia.org/wiki/Representational_state_transfer

app.listen(PORT, () => console.log(`APP listens on port ${PORT}`));
[
  { "_id": "9r23jr9203f902f", "name": "petras", "hobbies" : [ "Stuuf", "Things" ] },
  { "name": "jonas" },
  { "name": "antanas" }
]