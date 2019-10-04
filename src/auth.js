const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ROOT_URL } = process.env

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${ROOT_URL}/google/callback`,
  },
  function(accessToken, refreshToken, profile, done) {
    return done (profile.id)
  }
));

module.exports = passport;
