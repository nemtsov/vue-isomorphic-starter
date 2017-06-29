const Router = require('express').Router;
const wrap = require('express-async-wrap');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const loggers = require('../core/loggers');
const getInfo = require('./').getInfo;

const logger = loggers.get('api/resource');

const router = new Router();
module.exports = router;

router.use(jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://saturday-project.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://sp.yuriynemtsov.com/api',
  issuer: 'https://saturday-project.auth0.com/',
  algorithms: ['RS256']
}))

router.get('/authorized', wrap(async (req, res) => {
  logger.info('get info');
  res.json(await getInfo());
}));
