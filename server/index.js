import path from 'path';
import { exec } from 'child_process';
import webpack from 'webpack';
import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import githubHookHandler from 'github-webhook-handler';
import chalk from 'chalk';
import cors from 'cors';
import webpackConfig from '../webpack.config';
import config from './config';

require('babel-polyfill');
if (config.env === 'development') {
  const server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: false,
      errorDetails: false,
      warnings: false,
      publicPath: false
    },
    hot: true,
    historyApiFallback: true,
  });
  server.use(cors());
  server.use('/doc', express.static(path.join(__dirname, '../documentation/html')));
  server.listen(config.port, () => console.log(chalk.green(`Server is listening on port ${config.port}`)));
} else if (config.env === 'production') {
  // Launch Relay by creating a normal express server
  const server = express();
  server.use(cors());
  server.use(historyApiFallback());
  server.use('/', express.static(path.join(__dirname, '../build')));
  server.use('/doc', express.static(path.join(__dirname, '../documentation/html')));
  server.listen(config.port, () => console.log(chalk.green(`Server is listening on port ${config.port}`)));
}


const handler = githubHookHandler({ path: '/github', secret: 'test1234' });
const gitCallbackServer = express();
gitCallbackServer.use(cors());
gitCallbackServer.use((req, _res, next) => {
  console.log('req.url', req.url);
  handler(req, _res, (err) => {
    const res = _res;
    res.statusCode = 404;
    res.end('no such location');
  });
  next();
});
handler.on('push', () => {
  exec(path.join(__dirname, '../git_update.sh'), (error, stdout, stderr) => {
  });
});
gitCallbackServer.listen(4000, () => console.log(chalk.green('gitCallbackServer is listening on port 4000')));