import {Router} from 'express';
import wrap from 'express-async-wrap';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import loggers from '../core/loggers';

const logger = loggers.get('api/resource');

const router = new Router();
export default router;

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

router.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});
