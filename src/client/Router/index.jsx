import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Login from './../Login';
import Error404 from '../common/Error404';

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/login" component={Login} />
      <Route path="*" component={Error404} />
    </div>
  </Router>
);

export default AppRouter;
