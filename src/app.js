const express = require('express'),
  app = express(),
  passport = require('passport'),
  cookieParser = require('cookie-parser'),
  cookieSession = require('cookie-session'),
  helmet = require('helmet'),
  serveStatic = require('express-static-gzip'),
  router = express.Router(),
  auth = require('./auth');

require('dotenv').config();
const { EXPRESS_SECRET, NODE_ENV } = process.env

auth(passport);
app.use(passport.initialize());
app.use(cookieSession({
  name: 'session',
  keys: [EXPRESS_SECRET]
}));
app.use(cookieParser());
app.use(helmet());
// app.use(express.static(serveStatic(path.resolve(__dirname, '../stuff'))));

router.use((req, res, next) => {
  console.log("something is happening");
  next();
})

router.get('/', (req, res) => {
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

router.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
      failureRedirect: '/'
  }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/');
  }
);

router.get('auth/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

app.use(router)

module.exports = app
