'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import passport from './utils/pass.js';

const app = express();
const port = 3000;

const loogedIn = (req, res, next) =>
  req.user ? next() : res.redirect('/form');

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
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/form' }),
  (req, res) => {
    console.log('success');
    res.redirect('/secret');
  }
);

app.get('/secret', loogedIn, (req, res) => {
  res.render('secret');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
