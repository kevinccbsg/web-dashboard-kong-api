import PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Message, Icon } from 'semantic-ui-react';

const Form = (props) => {
  const { error } = props;
  const isError = !!error;
  return (
    <form action="/GSITAE/login" method="POST" className="form-container" noValidate>
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
          type="password"
        />
      </div>
      <div className="form-item">
        <Button primary>Login</Button>
      </div>
      <p>No a member, please contact with
        <a
          href="mailto:gsitae@upm.es"
          target="_top"
        > gsitae@upm.es</a>
      </p>
      {isError && (
        <Message attached="bottom" error>
          <Icon name="warning sign" />
          Error Loging
        </Message>
      )}
    </form>
  );
};

Form.propTypes = {
  error: PropTypes.string,
};

Form.defaultProps = {
  error: null,
};

export default Form;
