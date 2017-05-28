import express from 'express';
import wrap from 'express-async-wrap';
import fs from 'fs';
import Vue from 'vue';
import { createBundleRenderer } from 'vue-server-renderer';
import loggers from '../core/loggers';
import serverBundle from './dist/vue-ssr-server-bundle.json';
import clientManifest from './dist/vue-ssr-client-manifest.json';

const logger = loggers.get('web/resource');
const template = fs.readFileSync(`${__dirname}/index.template.html`, 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
})

const router = new express.Router();
export default router;

router.use('/dist', express.static(`${__dirname}/dist`));

router.get('*', wrap(async (req, res, next) => {
  const context = {
    title: 'Amazing!',
    url: req.url
  };

  renderer.renderToString(context, (err, html) => {
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
