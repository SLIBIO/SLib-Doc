'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

let appEntry;
let devtool;
let plugins;

const htmlTemplate = new HtmlWebpackPlugin({
  title: 'SLib',
  template: './client/index.html',
  mobile: true,
  inject: false
});
const favIcon = new FaviconsWebpackPlugin('./client/assets/logo.png');

if (process.env.NODE_ENV === 'production') {
  appEntry = ['babel-polyfill', path.join(__dirname, 'client/index.js')];
  devtool = 'source-map';
  plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    htmlTemplate,
    favIcon
  ];
} else {
  appEntry = [
    'babel-polyfill',
    path.join(__dirname, 'client/index.js'),
    'webpack-dev-server/client?http://172.20.2.70:3000',
    'webpack/hot/only-dev-server'
  ];
  devtool = 'eval';
  plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    }),
    htmlTemplate,
    favIcon
  ];
}

module.exports = {
  entry: {
    app: appEntry,
    vendor: ['react', 'react-dom', 'react-mdl', 'react-router']
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  devtool,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style', 'css?-colormin']
    }, {
      test: /\.scss$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1' +
        '&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
      ]
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader?limit=10000&name=assets/[hash].[ext]'
    }, {
      test: /\.(ttf|eot)$/,
      loader: 'file?name=assets/[name].[ext]'
    }]
  },
  postcss: () => [precss, autoprefixer],
  plugins
};
