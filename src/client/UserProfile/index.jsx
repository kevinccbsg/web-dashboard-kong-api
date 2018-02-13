import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
                  label="User code"
                  placeholder="User code"
                />
                <Form.Field
                  id="form-input-lab-name"
                  control={Input}
                  name="name"
                  value={item.name}
                  disabled
                  label="Nombre"
                  placeholder="Nombre"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  id="form-textarea-lab-surname"
                  control={Input}
                  name="surname"
                  value={item.surname}
                  label="Surname"
                  placeholder="Surname"
                  disabled
                />
                <Form.Field
                  id="form-textarea-lab-email"
                  control={Input}
                  name="email"
                  value={item.email}
                  label="Email"
                  placeholder="Email"
                  disabled
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  id="form-textarea-lab-grade"
                  control={Input}
                  name="grade"
                  value={item.grade}
                  label="Grade"
                  placeholder="Grade"
                  disabled
                />
                <Form.Field
                  id="form-textarea-lab-faculty"
                  control={Input}
                  name="faculty"
                  value={item.faculty}
                  label="Faculty"
                  placeholder="Faculty"
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
                  label="Roles"
                  placeholder="Roles"
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
                  label="Permissions"
                  placeholder="Permissions"
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
  item: PropTypes.object,
};

UserProfile.defaultProps = {
  item: {},
};

export default UserProfile;
