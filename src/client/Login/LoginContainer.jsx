import PropTypes from 'prop-types';
import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import Form from './Form';

const LoginContainer = props => (
  <Card className="login-container">
    <Card.Content>
      <Header as="h1">GSITAE</Header>
      <Form
        error={props.error}
      />
    </Card.Content>
  </Card>
);

LoginContainer.propTypes = {
  error: PropTypes.string,
};

LoginContainer.defaultProps = {
  error: null,
};

export default LoginContainer;
