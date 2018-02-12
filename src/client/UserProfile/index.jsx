import React from 'react';
import PropTypes from 'prop-types';
import { Header, Card, Form, Input, Dropdown } from 'semantic-ui-react';

const UserProfile = props => (
  <div className="inside-container">
    <Header as="h1">Application Content</Header>
    <Card className="user-profile-container">
      <Card.Content>
        <Form loading={props.loading}>
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-lab-code"
              control={Input}
              name="code"
              value={props.item.code}
              disabled
              label="User code"
              placeholder="User code"
            />
            <Form.Field
              id="form-input-lab-name"
              control={Input}
              name="name"
              value={props.item.name}
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
              value={props.item.surname}
              label="Surname"
              placeholder="Surname"
              disabled
            />
            <Form.Field
              id="form-textarea-lab-email"
              control={Input}
              name="email"
              value={props.item.email}
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
              value={props.item.grade}
              label="Grade"
              placeholder="Grade"
              disabled
            />
            <Form.Field
              id="form-textarea-lab-faculty"
              control={Input}
              name="faculty"
              value={props.item.faculty}
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
              value={props.item.roles}
              options={[]}
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
              value={props.item.permissions}
              options={[]}
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

UserProfile.propTypes = {
  item: PropTypes.object,
  loading: PropTypes.bool,
};

UserProfile.defaultProps = {
  loading: false,
  item: {},
};

export default UserProfile;
