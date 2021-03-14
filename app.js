'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
const port = 3000;
const username = 'foo';
const password = 'bar';

app.set('views', './views');
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Shh, it's a secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.username == username && req.body.password == password) {
    req.session.logged = true;
    res.redirect('/secret');
  } else {
    req.session.logged = false;
    res.redirect('/form');
  }

  console.log('req.session.logged', req.session.logged);
});

app.get('/secret', (req, res) => {
  console.log('req.session.logged', req.session.logged);
  !req.session.logged ? res.redirect('/form') : res.render('secret');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
