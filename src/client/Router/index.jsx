import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './../Login';
import Home from './../Home';
import Error404 from '../common/Error404';
import Authorization from './utils/Authorization';
import {
  all,
} from './utils/Roles';

const ALL = Authorization(all);

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/login" component={ALL(Login, true)} />
      <Route path="/" component={ALL(Home)} />
      <Route component={Error404} />
    </Switch>
  </Router>
);

export default AppRouter;
