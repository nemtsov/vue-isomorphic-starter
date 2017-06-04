const Pool = require('pg').Pool;
const url = require('url');
const config = require('./config');

const params = url.parse(config.get('DATABASE_URL'));
const auth = params.auth.split(':');

exports.pool = new Pool({
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
});
