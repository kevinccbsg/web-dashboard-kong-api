import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import CommonTable from '../common/CommonTable';
import DeleteUser from './DeleteUser';
import UserModal from './UserModal';

class UserManagment extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      itemSelected: {},
      openModal: false,
      basic: false,
      edit: false,
      codeSelected: '',
    };
    this.userModal = this.userModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    axios.get('/GSITAE/users')
    .then((response) => {
      const items = response.data.users.map(obj => (
        {
          ...obj,
          rolesValue: obj.roles.map(objR => objR.description).join(' '),
          permissionsValue: obj.permissions.map(objP => objP.description).join(' '),
        }
      ));
      this.setState({ items, openModal: false });
    })
    .catch(err => console.log(err.response));
  }

  handleDelete() {
    const { itemSelected } = this.state;
    axios.delete(`/GSITAE/user/${itemSelected.code}`)
    .then((response) => {
      console.log(response);
      const { items } = this.state;
      const itemsAdded = items.filter(obj => obj.code !== itemSelected.code);
      this.setState({
        items: itemsAdded,
        basic: false,
        openModal: false,
        itemSelected: {},
        codeSelected: '',
      });
    })
    .catch(err => console.log(err.response));
  }

  handleUser(data) {
    const { edit } = this.state;
    if (edit) {
      const { itemSelected } = this.state;
      return axios.patch(`/GSITAE/user/${itemSelected.code}`, data)
      .then((response) => {
        console.log(response);
        const { items } = this.state;
        const itemsAdded = items.map((obj) => {
          if (obj.code === response.data.code) {
            return response.data;
          }
          return { ...obj };
        });
        this.setState({ items: itemsAdded, openModal: false });
      })
      .catch(err => console.log(err.response));
    }
    return axios.post('/GSITAE/user', data)
    .then((response) => {
      console.log(response);
      const { items } = this.state;
      const itemsAdded = items.concat(response.data);
      this.setState({ items: itemsAdded, openModal: false });
    })
    .catch(err => console.log(err.response));
  }

  handleSelected(code) {
    const { items } = this.state;
    const itemSelected = items.find(obj => obj.code === code);
    this.setState({ codeSelected: code, itemSelected });
  }

  userModal(edit) {
    this.setState({ openModal: true, edit });
  }

  deleteModal() {
    this.setState({ openModal: false, basic: true, edit: false });
  }

  closeModal() {
    this.setState({ openModal: false, basic: false, edit: false });
  }

  render() {
    const { items, openModal, basic, itemSelected, edit } = this.state;
    const { intl } = this.props;
    return (
      <div className="inside-container">
        <Header as="h1">{intl.formatMessage({ id: 'usermanagment.title' })}</Header>
        <CommonTable
          items={items}
          keyNames={[
            'code',
            'name',
            'email',
            'grade',
            'roles',
            'permissions',
          ]}
          headersText={[
            'código',
            'name',
            'email',
            'grade',
            'roles',
            'permissions',
          ]}
          addText={intl.formatMessage({ id: 'usermanagment.add' })}
          editText={intl.formatMessage({ id: 'usermanagment.edit' })}
          deleteText={intl.formatMessage({ id: 'usermanagment.delete' })}
          onAdd={this.userModal}
          onEdit={() => this.userModal(true)}
          onDelete={this.deleteModal}
          onSelected={this.handleSelected}
          keySelected="code"
        />
        <DeleteUser
          contentHeader={intl.formatMessage({ id: 'usermanagment.delete' })}
          leftLabel={intl.formatMessage({ id: 'common.yes' })}
          rightLabel={intl.formatMessage({ id: 'common.no' })}
          title={intl.formatMessage({ id: 'usermanagment.delete.title' })}
          openModal={basic}
          onCloseModal={this.closeModal}
          onDelete={this.handleDelete}
        />
        <UserModal
          openModal={openModal}
          item={itemSelected}
          onCloseModal={this.closeModal}
          onSubmit={this.handleUser}
          edit={edit}
        />
      </div>
    );
  }
}

UserManagment.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(UserManagment);
