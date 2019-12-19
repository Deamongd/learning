const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const User = mongoose.model('Users', { name: { type: String, unique: true }, username: String, password: String, birthday: Date });
const app = express();
const PORT = 3000;

app.get('/register/:username/:password/:password2/:name/:birthday', (req, res) => {
  console.log(`request recieved at '/login' ${req.params.username} ${req.params.password} ${req.params.password2}`);
  User.findOne({ username: req.params.username }).then(data => {
    console.log(data);
    if (data) {
      res.send('User already exists');
    } else {
      const user = new User({
        name: req.params.name,
        birthday: req.params.birthday,
        username: req.params.username,
        password: req.params.password
      });
      user.save().then(() => res.send('user created succesfully'));
    }
  });
});

app.get('/hello/:birthday/:birthday2', (req, res) => {
  console.log(`request recieved at '/hello' ${req.params.birthday} ${req.params.birthday2}`);
  User.find({ birthday: { $gte: req.params.birthday, $lte: req.params.birthday2 } }).then(data => {
    console.log(data);
    res.send(data);
  });
});

app.get('/login/:username/:password/', (req, res) => {
  console.log(`request recieved at '/login' ${req.params.username}`);
  User.find({ username: req.params.username }, { password: req.params.password }).then(data => {
    console.log(data);
    if (data && data.length < 1) {
      res.send('Bad username');
    } else {
      User.find({ $and: [{ username: req.params.username }, { password: req.params.password }] }).then(data2 => {
        if (data2 && data2.length < 1) {
          res.send('Incorrect password');
        } else {
          res.send('Login Successful');
        }
      });
    }
  });
});

/* app.get('/users/:filters/:sort/:page/:limit', (req, res) => {
    console.log(`Filer: ${req.params.filters}, Sort:${req.params.sort}, Page: ${req.params.page}, Limit: ${req.params.limit}`);
 */
app.get('/users/:filters/:sort/:page/:limit', (req, res) => {
  console.log(`Filter: ${req.params.filters}, ${req.params.sort}, ${req.params.limit},`);
  const sort = (req.params.sort === 'ASC' ? 'ASC' : 'DESC');
  const filter = req.params.filter || '';
  const limit = req.params.limit <= 0 ? Number(req.params.limit) : 10;
  const page = req.params.page < User.length ? Number(req.params.page) : 0;
  User.find({ name: new RegExp(filter, 'g') }).project({ password: false }).sort({ name: sort }).limit(limit).skip((limit * page)).then(data => {
    console.log(data);
    res.send();
  });
});

app.listen(PORT, () => console.log(`APP listens on port ${PORT}`));

/* app.get('/users/:filters/:sort/:page/:limit', (req, res) => {
    console.log(`Filer: ${req.params.filters}, Sort:${req.params.sort}, Page: ${req.params.page}, Limit: ${req.params.limit}`);
    let sort = req.params.sort || "DESC"; // ASC or DESC
    let filter = req.params.filter || "";
    let page = req.params.limit >= 0 && req.params.page < users.length ? req.params.page : 0;
    let limit = req.params.limit >= 0 ? req.params.limit : 10;
    let userP = users.map(el => {
        return {
        id: el.id,
        name: el.name,
        birthday: el.birthday,
        username: el.username}
        });
    let filtered = userP.filter(el => el.name.includes(filter));
    let sorted = sort === "ASC" ? filtered.sort((a, b) => a.name.localeCompare(b.name)) : filtered.sort((a, b) => b.name.localeCompare(a.name));
    let sortedandfiltered = sorted.slice(page*limit,(page+1)*limit)
    res.send(sortedandfiltered)
    console.log(page,limit)

}); */
/* const user1 = users.find(el => el.username == "random1")
const user2 = users.find(el => el.username == "random1asdfasdf")

console.log  (user1, user2) */

/* User name and pass = Login successful
 User name = good, password = bad then bad password.
 User name bad = user does not exist */

/* app.get('/', (req, res) => {
    console.log(`request recieved at '/'`);
    res.send('hello from server');
});

app.get('/dude', (req, res) => {
    console.log(`request recieved at '/dude'`);
    res.send(`<h1>LOL</h1><input type="text">`);
});
*/
/* app.get('/hello/:birthday/:birthday2', (req, res) => {
    console.log(`request recieved at '/hello' ${req.params.birthday} ${req.params.birthday2}`);
    res.send('hello from user ' + JSON.stringify(users.filter(el => (el.birthday >= req.params.birthday) && (el.birthday = req.params.birthday2))));
});
 */
/* app.get('/login/:username/', (req, res) => {
    console.log(`request recieved at '/login' ${req.params.username}`);
    users.find(el => (el.username == req.param.username ? console.log("good") : console.log("fuck")))
    res.send ("Login:");
});
 */

/* app.get('/login/:id/', (req, res) => {
    console.log(`request recieved at '/login' ${req.params.id}`);
    let user = users.find(el => (el.id === req.param.id)? console.log(user):console.log("meh"));
    res.send (console.log(user));
 }); */

/*  const checkPassword = (user, res, password) => {
    user.password === password ? res.send('good username and password') : res.send('bad password');
 }

app.get('/login/:username/:password/', (req, res) => {
   console.log(`request recieved at '/login' ${req.params.username}`);
   const user = users.find(el => el.username === req.params.username);
   user ? checkPassword(user, res, req.params.password) : res.send('bad username');
});

 */
/* const checkpass2 = (req, res, pass1, pass2,) => { 
    pass1 === pass2 ? res.send('passwords match') : res.send('passwords do not match');
}

app.get('/register/:username/:password/:password2', (req, res) => {
    console.log(`request recieved at '/login' ${req.params.username} ${req.params.password} ${req.params.password2}`);
    const user = users.find(el => el.username === req.params.username);
    let pass1 = req.params.password;
    let pass2 = req.params.password2;
    user ? res.send('User name is taken') : checkpass2(pass1, pass2) ;
}); */

/*
app.get('/register/:username/:password/:password2/:name/:dateofbirth', (req, res) => {
    console.log(`request recieved at '/login' ${req.params.username} ${req.params.password} ${req.params.password2} ${req.params.name} ${req.params.dateofbirth}`);
    const user = users.find(el => el.username === req.params.username);
    let pass1 = req.params.password;
    let pass2 = req.params.password2;
    let maxid = 0;
    Maxid = Math.max(...users.map(el => el.id)) + 1;
    let newuser = {id: maxid+1, name: req.params.name , birthday: req.params.dateofbirth, username: req.params.username, password: req.params.password};
    user ? res.send('User name is taken') && console.log (users) : pass1 === pass2 ? users.push(newuser) && console.log (users)  : res.send('passwords do not match')  
});
 */
/* app.get('/users/:filter/:sort/:limit/:page', (req, res) => {
    console.log(`request recieved at '/users/:filter/:sort/:limit/:page'`); */

/* app.get('/users', (req, res) => {
    console.log(`request recieved at '/users/`);
    const names = users.map(el => el.name);;
    res.send(names)
});

app.get('/users/:filters', (req, res) => {
    console.log(`request recieved at '/users/:filters`);
    const names = users.map(el => el.name);
    console.log()
    res.send(users.filter(el => el.name.includes(req.params.filters)))
});

app.get('/users/:filters/:sort', (req, res) => {
    console.log(`request recieved at '/users/:filters/:sort`);
    let user15 = users.filter(el => el.name.includes(req.params.filters))
    req.params.sort === "ASC" ? res.send(user15.sort((a, b) => a.name.localeCompare(b.name))) : 
    req.params.sort === "DESC" ? res.send(user15.sort((a, b) => b.name.localeCompare(a.name))) : res.send("Bad sorting selected, please use ASC or DESC"+ JSON.stringify(user15, null, 2))
}); */

/* let newUser = {id: maxid, name: req.params.name , birthday: req.params.dateofbirth, username: req.params.username, password: req.params.password};
users.push(newUser); */
/* users.push({id = users[users.length].id,name = req.params.name, birthday = req.params.dateofbirth, username = req.params.username, password = req.params.password})
users.push({id:oldId + 1, name:"N/A", username:req.params.username, password:req.params.password1}); */

/*  app.get('/login/:username/:password', (req, res) => {
    console.log(`request recieved at '/login' ${req.params.username} ${req.params.password}`);
    let response = ''; () => {
    (users.filter(el => (el.username == req.param.username  && el.password == passwordreq.param.password  
        ? response = "Login Succesful" : el.username !== req.param.username ? response = "Bad Username" : el.username == req.param.username && el.password !== req.param.password ? response = "Bad Password" : null)))};
    res.send(response);
}); */
