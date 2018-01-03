import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import CommonTable from '../common/CommonTable';
import DeleteUser from './DeleteUser';
import UserModal from './UserModal';

class UserManagment extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        {
          code: 50083,
          name: 'Kevin Julián Martinez Escobar',
          email: 'kevinjulian.martinezescobar@alumnos.upm.es',
          grade: 'Electronica industrial y automatica',
          roles: 'Admin',
          permissions: 'Admin, Peltier, FPGA, Compilador C',
        },
        {
          code: 50084,
          name: 'Kevin Julián Martinez Escobar',
          email: 'kevinjulian.martinezescobar@alumnos.upm.es',
          grade: 'Electronica industrial y automatica',
          roles: 'Admin',
          permissions: 'Admin, Peltier, FPGA, Compilador C',
        },
      ],
      itemSelected: {},
      openModal: false,
      basic: false,
      edit: false,
      codeSelected: '',
    };
    this.userModal = this.userModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
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
        />
        <UserModal
          openModal={openModal}
          item={itemSelected}
          onCloseModal={this.closeModal}
        />
      </div>
    );
  }
}

export default UserManagment;
