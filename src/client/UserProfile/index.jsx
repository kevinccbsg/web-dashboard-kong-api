import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Header, Card, Form, Input, Dropdown } from 'semantic-ui-react';
import axios from 'axios';


class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      rolesList: [],
      permissionsList: [],
      item: {},
    };
  }

  componentWillMount() {
    axios.get('/GSITAE/rolepermissions/list')
    .then((response) => {
      const rolesList = response.data.roles.map(obj => (
        {
          key: obj._id,
          value: obj.name,
          text: obj.description,
        }
      ));
      const permissionsList = response.data.permissions.map(obj => (
        {
          key: obj._id,
          value: obj.name,
          text: obj.description,
        }
      ));
      this.setState({ rolesList, permissionsList });
      return axios.get('/GSITAE/user/me');
    })
    .then((response) => {
      const user = response.data;
      this.setState({ loading: false, item: user });
    })
    .catch(err => console.log(err));
  }

  render() {
    const { loading, item, rolesList, permissionsList } = this.state;
    const { intl } = this.props;
    return (
      <div className="inside-container">
        <Header as="h1">User Profile</Header>
        <Card className="user-profile-container">
          <Card.Content>
            <Form loading={loading}>
              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-lab-code"
                  control={Input}
                  name="code"
                  value={item.code}
                  disabled
                  label={intl.formatMessage({ id: 'form.code' })}
                  placeholder={intl.formatMessage({ id: 'form.uncomplete' })}
                />
                <Form.Field
                  id="form-input-lab-name"
                  control={Input}
                  name="name"
                  value={item.name}
                  disabled
                  label={intl.formatMessage({ id: 'form.name' })}
                  placeholder={intl.formatMessage({ id: 'form.uncomplete' })}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  id="form-textarea-lab-surname"
                  control={Input}
                  name="surname"
                  value={item.surname}
                  label={intl.formatMessage({ id: 'form.surname' })}
                  placeholder={intl.formatMessage({ id: 'form.uncomplete' })}
                  disabled
                />
                <Form.Field
                  id="form-textarea-lab-email"
                  control={Input}
                  name="email"
                  value={item.email}
                  label={intl.formatMessage({ id: 'form.email' })}
                  placeholder={intl.formatMessage({ id: 'form.uncomplete' })}
                  disabled
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  id="form-textarea-lab-grade"
                  control={Input}
                  name="grade"
                  value={item.grade}
                  label={intl.formatMessage({ id: 'form.grade' })}
                  placeholder={intl.formatMessage({ id: 'form.uncomplete' })}
                  disabled
                />
                <Form.Field
                  id="form-textarea-lab-faculty"
                  control={Input}
                  name="faculty"
                  value={item.faculty}
                  label={intl.formatMessage({ id: 'form.faculty' })}
                  placeholder={intl.formatMessage({ id: 'form.uncomplete' })}
                  disabled
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Dropdown
                  id="form-textarea-lab-roles"
                  control={Dropdown}
                  name="roles"
                  value={item.roles}
                  options={rolesList}
                  fluid
                  multiple
                  selection
                  label={intl.formatMessage({ id: 'form.roles' })}
                  placeholder={intl.formatMessage({ id: 'form.uncomplete' })}
                  disabled
                />
                <Form.Dropdown
                  id="form-textarea-lab-permissions"
                  control={Dropdown}
                  name="permissions"
                  value={item.permissions}
                  options={permissionsList}
                  fluid
                  multiple
                  selection
                  disabled
                  label={intl.formatMessage({ id: 'form.permissions' })}
                  placeholder={intl.formatMessage({ id: 'form.uncomplete' })}
                />
              </Form.Group>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

UserProfile.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(UserProfile);
