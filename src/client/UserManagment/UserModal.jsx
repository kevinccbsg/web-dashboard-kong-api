import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Modal, Button, Icon, Form, Input, Message, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
import axios from 'axios';

const initialState = {
  error: false,
  loading: false,
  name: '',
  surname: '',
  code: '',
  email: '',
  grade: '',
  faculty: '',
  roles: [],
  permissions: [],
  listError: [],
  listErrorMessages: [],
};

const fields = [
  'name',
  'surname',
  'code',
  'email',
  'grade',
  'faculty',
  'roles',
  'permissions',
];

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

class UserModal extends Component {
  constructor() {
    super();
    this.state = {
      ...initialState,
      rolesList: [],
      permissionsList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    })
    .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;
    if (nextProps.item.name !== item.name) {
      this.setState({ ...nextProps.item });
    }
  }

  handleClose() {
    this.setState(initialState);
    this.props.onCloseModal();
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const formFields = _.pick(this.state, fields);
    const formKeys = _.keys(formFields);
    const listErrorMessages = [];
    const listError = [];
    formKeys.forEach((obj) => {
      if (formFields[obj] === '') {
        listErrorMessages.push(`Field ${obj} required`);
        listError.push(obj);
      }
    });
    if (listErrorMessages.length !== 0) {
      return this.setState({
        error: true,
        listErrorMessages,
        listError,
      });
    }
    const { rolesList, permissionsList } = this.state;
    const roles = formFields.roles.map((obj) => {
      const findTmp = rolesList.find(objF => objF.name === obj);
      if (!findTmp) return obj;
      return findTmp;
    });
    const permissions = formFields.permissions.map((obj) => {
      const findTmp = permissionsList.find(objF => objF.name === obj);
      if (!findTmp) return obj;
      return findTmp;
    });
    const formatSend = {
      ...formFields,
      roles,
      permissions,
    };
    return this.props.onSubmit(formatSend);
  }

  render() {
    const {
      loading,
      name,
      surname,
      code,
      email,
      grade,
      faculty,
      roles,
      permissions,
      listError,
      listErrorMessages,
      error,
      rolesList,
      permissionsList,
    } = this.state;
    const { openModal, item } = this.props;
    const selected = !!item.name;
    return (
      <Modal
        open={openModal}
        size="small"
        onClose={this.props.onCloseModal}
      >
        <Header icon="trash outline" content="Delete Lab" />
        <Modal.Content>
          <Form error={error} loading={loading}>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-lab-code"
                control={Input}
                name="code"
                value={code}
                disabled={selected}
                onChange={this.handleChange}
                label="User code"
                placeholder="User code"
                error={listError.includes('code')}
              />
              <Form.Field
                id="form-input-lab-name"
                control={Input}
                name="name"
                value={name}
                onChange={this.handleChange}
                label="Nombre"
                placeholder="Nombre"
                error={listError.includes('name')}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-textarea-lab-surname"
                control={Input}
                name="surname"
                value={surname}
                onChange={this.handleChange}
                label="Surname"
                placeholder="Surname"
                error={listError.includes('surname')}
              />
              <Form.Field
                id="form-textarea-lab-email"
                control={Input}
                name="email"
                value={email}
                onChange={this.handleChange}
                label="Email"
                placeholder="Email"
                error={listError.includes('email')}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-textarea-lab-grade"
                control={Input}
                name="grade"
                value={grade}
                onChange={this.handleChange}
                label="Grade"
                placeholder="Grade"
                error={listError.includes('grade')}
              />
              <Form.Field
                id="form-textarea-lab-faculty"
                control={Input}
                name="faculty"
                value={faculty}
                onChange={this.handleChange}
                label="Faculty"
                placeholder="Faculty"
                error={listError.includes('faculty')}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Dropdown
                id="form-textarea-lab-roles"
                control={Dropdown}
                name="roles"
                value={roles}
                onChange={this.handleChange}
                options={rolesList}
                fluid
                multiple
                selection
                label="Roles"
                placeholder="Roles"
                error={listError.includes('roles')}
              />
              <Form.Dropdown
                id="form-textarea-lab-permissions"
                control={Dropdown}
                name="permissions"
                value={permissions}
                onChange={this.handleChange}
                options={permissionsList}
                fluid
                multiple
                selection
                label="Permissions"
                placeholder="Permissions"
                error={listError.includes('permissions')}
              />
            </Form.Group>
            <Message
              error
              header="Error create Lab"
              list={listErrorMessages}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            disabled={loading}
            onClick={this.handleSubmit}
          >
            <Icon name="checkmark" /> Yes
          </Button>
          <Button
            basic
            color="red"
            disabled={loading}
            onClick={this.handleClose}
          >
            <Icon name="remove" /> No
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

UserModal.propTypes = {
  item: PropTypes.object,
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

UserModal.defaultProps = {
  item: {},
  openModal: false,
  onCloseModal: () => 0,
  onSubmit: () => 0,
};

export default UserModal;
