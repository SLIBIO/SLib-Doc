import path from 'path';
import { exec } from 'child_process';
import webpack from 'webpack';
import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
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
  server.use('/update', (req, _res, next) => {
    _res.end('Update Doc');
    exec(path.join(__dirname, '../git_update.sh'), (error, stdout, stderr) => {
      _res.end('Update Doc completed');
    });
  });
  server.use(cors());
  server.use('/doc', express.static(path.join(__dirname, '../documentation/html')));
  server.listen(config.port, () => console.log(chalk.green(`Server is listening on port ${config.port}`)));
} else if (config.env === 'production') {
  // Launch Relay by creating a normal express server
  const server = express();
  server.use('/update', (req, _res, next) => {
    _res.end('Update Doc');
    exec(path.join(__dirname, '../git_update.sh'), (error, stdout, stderr) => {
      _res.end('Update Doc completed');
    });
  });
  server.use(cors());
  server.use(historyApiFallback());
  server.use('/', express.static(path.join(__dirname, '../build_client')));
  server.use('/doc', express.static(path.join(__dirname, '../documentation/html')));
  server.listen(config.port, () => console.log(chalk.green(`Server is listening on port ${config.port}`)));
}
