import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import CommonTable from '../common/CommonTable';
import DeleteApi from './DeleteApi';
import ApiModal from './ApiModal';

class LabManagment extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        {
          name: 'Api-one',
          uris: '/apione',
          upstream_url: 'http://api-one:3001',
          description: 'Aplicacion de prueba',
          strip_uri: true,
          preserve_host: false,
        },
        {
          name: 'Api-two',
          uris: '/apitwo',
          upstream_url: 'http://api-two:3001',
          description: 'Aplicacion de prueba',
          strip_uri: true,
          preserve_host: false,
        },
      ],
      itemSelected: {},
      openModal: false,
      basic: false,
      edit: false,
      codeSelected: '',
    };
    this.apiModal = this.apiModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(code) {
    const { items } = this.state;
    const itemSelected = items.find(obj => obj.name === code);
    this.setState({ codeSelected: code, itemSelected });
  }

  apiModal() {
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
        <Header as="h1">Api managment</Header>
        <CommonTable
          items={items}
          keyNames={[
            'name',
            'uris',
            'upstream_url',
            'description',
            'strip_uri',
            'preserve_host',
          ]}
          headersText={[
            'Nombre',
            'uris',
            'upstream_url',
            'description',
            'strip_uri',
            'preserve_host',
          ]}
          addText="Añadir Api"
          editText="Editar Api"
          deleteText="Eliminar Api"
          onAdd={this.apiModal}
          onEdit={() => this.apiModal(true)}
          onDelete={this.deleteModal}
          onSelected={this.handleSelected}
          keySelected="name"
        />
        <DeleteApi
          openModal={basic}
          onCloseModal={this.closeModal}
        />
        <ApiModal
          openModal={openModal}
          item={itemSelected}
          onCloseModal={this.closeModal}
        />
      </div>
    );
  }
}

export default LabManagment;
