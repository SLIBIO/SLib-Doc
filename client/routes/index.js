import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import MainScene from '../scenes/MainScene';

export default (
  <Route
    path='/'
    component={MainScene}
  >
    <IndexRoute component={MainScene} />
    <Redirect from='*' to='/' />
  </Route>
);

