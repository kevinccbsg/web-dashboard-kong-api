import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
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
      this.setState({
        ...nextProps.item,
        roles: nextProps.item.roles,
        permissions: nextProps.item.permissions,
      });
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
    const { openModal, item, intl } = this.props;
    const selected = !!item.name;
    return (
      <Modal
        open={openModal}
        size="small"
        onClose={this.props.onCloseModal}
      >
        <Header icon="trash outline" content={intl.formatMessage({ id: 'usermanagment.title' })} />
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
                label={intl.formatMessage({ id: 'form.code' })}
                placeholder={intl.formatMessage({ id: 'form.code' })}
                error={listError.includes('code')}
              />
              <Form.Field
                id="form-input-lab-name"
                control={Input}
                name="name"
                value={name}
                onChange={this.handleChange}
                label={intl.formatMessage({ id: 'form.name' })}
                placeholder={intl.formatMessage({ id: 'form.name' })}
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
                label={intl.formatMessage({ id: 'form.surname' })}
                placeholder={intl.formatMessage({ id: 'form.surname' })}
                error={listError.includes('surname')}
              />
              <Form.Field
                id="form-textarea-lab-email"
                control={Input}
                name="email"
                value={email}
                onChange={this.handleChange}
                label={intl.formatMessage({ id: 'form.email' })}
                placeholder={intl.formatMessage({ id: 'form.email' })}
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
                label={intl.formatMessage({ id: 'form.grade' })}
                placeholder={intl.formatMessage({ id: 'form.grade' })}
                error={listError.includes('grade')}
              />
              <Form.Field
                id="form-textarea-lab-faculty"
                control={Input}
                name="faculty"
                value={faculty}
                onChange={this.handleChange}
                label={intl.formatMessage({ id: 'form.faculty' })}
                placeholder={intl.formatMessage({ id: 'form.faculty' })}
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
                label={intl.formatMessage({ id: 'form.roles' })}
                placeholder={intl.formatMessage({ id: 'form.roles' })}
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
                label={intl.formatMessage({ id: 'form.permissions' })}
                placeholder={intl.formatMessage({ id: 'form.permissions' })}
                error={listError.includes('permissions')}
              />
            </Form.Group>
            <Message
              error
              header={intl.formatMessage({ id: 'usermanagment.form.error' })}
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
            <Icon name="checkmark" /> {intl.formatMessage({ id: 'common.save' })}
          </Button>
          <Button
            basic
            color="red"
            disabled={loading}
            onClick={this.handleClose}
          >
            <Icon name="remove" /> {intl.formatMessage({ id: 'common.no' })}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

UserModal.propTypes = {
  intl: intlShape.isRequired,
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

export default injectIntl(UserModal);
