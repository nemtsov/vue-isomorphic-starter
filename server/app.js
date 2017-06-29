const express = require('express');
const bodyParser = require('body-parser');
const config = require('./core/config');
const loggers = require('./core/loggers');
const init = require('./core/init');
const api = require('./api/resource');
const web = require('./web/resource');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/_health', (req, res) => res.end('ok'));
app.use('/favicon.ico', (req, res) => res.end());
app.use('/api', api);
app.use('/', web);

const port = config.get('PORT');
const logger = loggers.get('app');

init()
  .catch(e => {
    logger.error(e.stack);
    process.exit(1);
  })
  .then(() => {
    app.listen(port, () => {
      logger.info(`on :${port}`);
    });
  });
