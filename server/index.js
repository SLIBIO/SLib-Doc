import path from 'path';
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

const handler = githubHookHandler({ path: '/github', secret: 'test1234' });
if (config.env === 'development') {
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
  gitCallbackServer.listen(4000, () => console.log(chalk.green('gitCallbackServer is listening on port 4000')));

  const server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    hot: true,
    historyApiFallback: true,
  });
  server.use(cors());
  // Serve static resources
  // server.use('/', express.static(path.join(__dirname, '../build')));
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
