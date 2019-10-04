const express = require('express'),
    app = express(),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    helmet = require('helmet')
    auth = require('./auth');

require('dotenv').config();
const { EXPRESS_SECRET } = process.env

auth(passport);
app.use(passport.initialize());
app.use(cookieSession({
  name: 'session',
  keys: [EXPRESS_SECRET]
}));
app.use(cookieParser());
app.use(helmet);

app.get('/', (req, res) => {
  if (req.session.token) {
    res.cookie('token', req.session.token);
    res.json({
        status: 'session cookie set'
    });
  } else {
      res.cookie('token', '')
      res.json({
          status: 'session cookie not set'
      });
  }
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {
      failureRedirect: '/'
  }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/');
  }
);

module.exports = app
