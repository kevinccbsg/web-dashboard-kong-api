import React, { Component } from 'react';
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
    axios.delete(`/GSITAE/user/${itemSelected.name}`)
    .then((response) => {
      console.log(response);
      const { items } = this.state;
      const itemsAdded = items.filter(obj => obj.name !== itemSelected.name);
      this.setState({ items: itemsAdded, basic: false, itemSelected: {}, codeSelected: '' });
    })
    .catch(err => console.log(err.response));
  }

  handleUser(data) {
    console.log(data);
    axios.post('/GSITAE/user', data)
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

  userModal() {
    this.setState({ openModal: true });
  }

  deleteModal() {
    this.setState({ openModal: false, basic: true });
  }

  closeModal() {
    this.setState({ openModal: false, basic: false, edit: false });
  }

  render() {
    const { items, openModal, basic, itemSelected } = this.state;
    return (
      <div className="inside-container">
        <Header as="h1">User managment</Header>
        <CommonTable
          items={items}
          keyNames={[
            'code',
            'name',
            'email',
            'grade',
            'rolesValue',
            'permissionsValue',
          ]}
          headersText={[
            'código',
            'name',
            'email',
            'grade',
            'roles',
            'permissions',
          ]}
          addText="Añadir Usuario"
          editText="Editar Usuario"
          deleteText="Eliminar Usuario"
          onAdd={this.userModal}
          onEdit={() => this.userModal(true)}
          onDelete={this.deleteModal}
          onSelected={this.handleSelected}
          keySelected="code"
        />
        <DeleteUser
          openModal={basic}
          onCloseModal={this.closeModal}
          onDelete={this.handleDelete}
        />
        <UserModal
          openModal={openModal}
          item={itemSelected}
          onCloseModal={this.closeModal}
          onSubmit={this.handleUser}
        />
      </div>
    );
  }
}

export default UserManagment;
