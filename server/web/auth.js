const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const ensureLogin = require('connect-ensure-login');
const config = require('../core/config');

exports.ensureLoggedIn = ensureLogin.ensureLoggedIn();

exports.init = function(router) {
  const strategy = new Auth0Strategy({
    domain: config.get('AUTH0_DOMAIN'),
    clientID: config.get('AUTH0_CLIENT_ID'),
    clientSecret: config.get('AUTH0_CLIENT_SECRET'),
    callbackURL: config.get('AUTH0_CALLBACK_URL'),
  }, (accessToken, refreshToken, extraParams, profile, done) => {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

  passport.use(strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  router.use(session({
    secret: config.get('SESSION_COOKIE_SECRET'),
    store: new RedisStore({
      url: config.get('REDIS_URL'),
    }),
  }));
  router.use(passport.initialize());
  router.use(passport.session());

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
    (req, res) => res.redirect(req.session.returnTo || '/user'));
};
