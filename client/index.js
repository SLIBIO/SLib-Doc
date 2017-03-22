import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import 'react-mdl/extra/material';
import Route from './routes';

require('babel-core/register');
require('babel-polyfill');

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);
ReactDOM.render(
  <Router history={browserHistory} routes={Route} />,
  rootNode
);
