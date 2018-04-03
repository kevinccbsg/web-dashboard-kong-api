import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Form from './Form';

@connect(store => (
  {
    visibility: store.main.visibility,
  }
))
class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { visibility, callback } = this.props;
    let url = '/';
    if (callback) {
      url = callback;
    }
    return (
      <Card className="login-container">
        <Card.Content>
          <Header as="h1">GSITAE</Header>
          {(visibility.length !== 0) && (
            <div className="redirect-button">
              <a href={url}>
                <Button primary>Login</Button>
              </a>
            </div>
          )}
          {(visibility.length === 0) && (
            <Form
              error={this.props.error}
            />
          )}
        </Card.Content>
      </Card>
    );
  }
}

LoginContainer.propTypes = {
  error: PropTypes.string,
  visibility: PropTypes.array,
  callback: PropTypes.string,
};

LoginContainer.defaultProps = {
  error: null,
  visibility: [],
  callback: '',
};

export default LoginContainer;
