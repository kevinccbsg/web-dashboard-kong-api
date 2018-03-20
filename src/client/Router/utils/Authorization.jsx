import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { saveRoles } from './actions';


const Authorization = allowedRoles => (WrappedComponent, freeAccess) => (
  @connect(store => (
    {
      roles: store.main.visibility,
    }
  ))
  class WithAuthorization extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
      };
    }

    componentWillMount() {
      axios.get('/hasAccess')
      .then((data) => {
        this.props.dispatch(saveRoles(data.data.roles, data.data.user));
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(this.props);
        if (freeAccess) {
          return this.props.dispatch(saveRoles([], {}));
        }
        location.href = '/login';
        return null;
      });
    }

    render() {
      const { roles } = this.props;
      const rolesMattched = _.intersection(allowedRoles, roles);
      if (rolesMattched.length === 0 && !freeAccess) {
        return (
          <h1>FORBIDEN</h1>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }
);

export default Authorization;
