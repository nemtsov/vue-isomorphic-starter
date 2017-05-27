import { Router } from 'express';
import wrap from 'express-async-wrap';
import loggers from '../core/loggers';

const logger = loggers.get('web/resource');

const router = new Router();
export default router;

router.get('*', wrap(async (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('Hello World!');
}));
