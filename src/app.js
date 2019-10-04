const express = require('express')
const passport = require('passport')
const serveStatic = require('express-static-gzip')
const helmet = require('helmet')
const session = require('express-session');

require('dotenv').config(); 
const { EXPRESS_SECRET } = process.env
const passportGoogle = require('./auth');
const app = express()

const router = express.Router();

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: EXPRESS_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize())
// app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

router.use((req, res, next) => {
    console.log("something is happening");
    next();
})

router.get('/ahead', (req, res) => {
  res.status(200).send('public face!')
})

console.log(`hello`);
router.use('/google',
  passportGoogle.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/behind');
  }
);

router.get('/login', function(req, res, next) {
  res.redirect('/google');
});

router.get('/behind', (req, res) => {
  res.status(200).send('ya got it!')
})

app.use(router)

module.exports = app
