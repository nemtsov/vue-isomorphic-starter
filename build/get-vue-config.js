const autoprefixer = require('autoprefixer');
const suppotedBrowsers = require('./supported-browsers');

const isProd = process.env.NODE_ENV === 'production';

module.exports = function getConfig(babelEnv) {
  return {
    loaders: {
      js: `babel-loader?forceEnv=${babelEnv}`
    },
    extractCSS: isProd,
    preserveWhitespace: false,
    postcss: [
      autoprefixer({
        browsers: suppotedBrowsers,
      }),
    ],
  };
};
