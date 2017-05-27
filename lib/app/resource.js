import { Router } from 'express';
import wrap from 'express-async-wrap';
import loggers from '../core/loggers';
import { getInfo } from './';

const logger = loggers.get('app/resource');

const router = new Router();
export default router;

router.get('*', wrap(async (req, res) => {
  res.html('Hello World!');
}));
