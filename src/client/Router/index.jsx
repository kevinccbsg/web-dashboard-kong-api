import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Login from './../Login';

const AppRouter = () => (
  <Router>
    <Route exact path="/" component={Login} />
  </Router>
);

export default AppRouter;
