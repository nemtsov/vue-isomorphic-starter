import { Pool } from 'pg';
import url from 'url';
import config from './config';

const params = url.parse(config.get('DATABASE_URL'));
const auth = params.auth.split(':');

export const pool = new Pool({
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
});
