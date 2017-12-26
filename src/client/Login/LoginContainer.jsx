import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import Form from './Form';

const LoginContainer = () => (
  <Card className="login-container">
    <Card.Content>
      <Header as="h1">GSITAE</Header>
      <Form />
    </Card.Content>
  </Card>
);

export default LoginContainer;
