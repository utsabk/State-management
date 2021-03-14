'use strict';

import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/setCookie/:clr', (req, res) => {
  const clr = req.params.clr
  console.log(clr)
  res.cookie('color', clr).send('cookie set');
  console.log('Cookies: ', req.cookies);
})

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('cookie cleared');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
