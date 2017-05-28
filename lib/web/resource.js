import express from 'express';
import wrap from 'express-async-wrap';
import fs from 'fs';
import Vue from 'vue';
import { createBundleRenderer } from 'vue-server-renderer';
import loggers from '../core/loggers';
import config from '../core/config';
import serverBundle from './dist/vue-ssr-server-bundle.json';
import clientManifest from './dist/vue-ssr-client-manifest.json';

const router = new express.Router();
export default router;

const logger = loggers.get('web/resource');

const renderer = new Promise((resolve, reject) => {
  const template = fs.readFileSync(`${__dirname}/index.template.html`, 'utf-8');

  function createRenderer (bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
      runInNewContext: false,
      template,
    }));
  }

  if (config.get('NODE_ENV') === 'production') {
    const bundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    resolve(createRenderer(bundle, { clientManifest }));
  } else {
    const setup = require('./build/setup-dev-server');
    setup(router, (bundle, options) => {
      resolve(createRenderer(bundle, options));
    });
  }
});

router.use('/dist', express.static(`${__dirname}/dist`));

router.get('*', wrap(async (req, res, next) => {
  const context = {
    title: 'Amazing!',
    url: req.url
  };

  (await renderer).renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        next(err);
      }
    } else {
      res.end(html);
    }
  });
}));
