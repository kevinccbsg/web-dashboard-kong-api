import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import Loader from './../../common/Loader';
import { saveRoles } from './actions';


const Authorization = (allowedRoles, main) => WrappedComponent => (
  @connect(store => (
    {
      roles: store.visibility.visibility,
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
        this.props.dispatch(saveRoles(data.data.data, data.data.user));
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(this.props);
        // this.props.history.push("/new/url");
        // browserHistory.push('/403');
        return null;
      });
    }

    render() {
      const { roles } = this.props;
      const rolesMattched = _.intersection(allowedRoles, roles);
      let isMain = main || false;
      if (this.state.loading) {
        return <Loader />;
      }
      if (rolesMattched.length === 0) {
        return (
          <h1>FORBIDEN</h1>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }
);

export default Authorization;
