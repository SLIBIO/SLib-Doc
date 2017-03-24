import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import MainScene from '../scenes/MainScene';
import ShowcaseScene from '../scenes/ShowcaseScene';

export default (
  <Route
    path='/'
  >
    <IndexRoute component={MainScene} />
    <Route path='/showcase' component={ShowcaseScene} />
    <Redirect from='*' to='/' />
  </Route>
);

