import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Input, Button, Message, Icon } from 'semantic-ui-react';


const Form = (props) => {
  const { error, intl } = props;
  const isError = !!error;
  return (
    <form action="/GSITAE/login" method="POST" className="form-container" noValidate>
      <div className="form-item">
        <Input
          icon="user"
          iconPosition="left"
          label={{ content: '@alumnos.upm.es' }}
          labelPosition="right"
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
      <p>{intl.formatMessage({ id: 'login.disclaimer' })}
        <a
          href="mailto:gsitae@upm.es"
          target="_top"
        > gsitae@upm.es</a>
      </p>
      {isError && (
        <Message attached="bottom" error>
          <Icon name="warning sign" />
          {intl.formatMessage({ id: 'login.error' })}
        </Message>
      )}
    </form>
  );
};

Form.propTypes = {
  error: PropTypes.string,
  intl: intlShape.isRequired,
};

Form.defaultProps = {
  error: null,
};

export default injectIntl(Form);
