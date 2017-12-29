import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './../Login';
import Home from './../Home';
import Error404 from '../common/Error404';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
      <Route component={Error404} />
    </Switch>
  </Router>
);

export default AppRouter;
