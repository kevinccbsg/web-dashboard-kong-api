import React, { Component } from 'react';
import { Input, Button, Message, Icon } from 'semantic-ui-react';
import Loader from '../common/Loader';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    setTimeout(() => this.setState({
      error: true,
      loading: false,
    }), 1000);
  }

  render() {
    const { loading, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form-container" noValidate>
        <div className="form-item">
          <Input
            icon="user"
            iconPosition="left"
            placeholder="Username"
            name="username"
          />
        </div>
        <div className="form-item">
          <Input
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="form-item">
          {!loading && (
            <Button primary>Primary</Button>
          )}
          {loading && (
            <Loader />
          )}
        </div>
        <p>No a member, please contact with
          <a
            href="mailto:gsitae@upm.es"
            target="_top"
          > gsitae@upm.es</a>
        </p>
        {error && (
          <Message attached="bottom" error>
            <Icon name="warning sign" />
            Error Loging
          </Message>
        )}
      </form>
    );
  }
}

export default Form;
