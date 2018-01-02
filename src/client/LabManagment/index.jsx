import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import CommonTable from '../common/CommonTable';
import DeleteLab from './DeleteLab';
import LabModal from './LabModal';

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
    this.labModal = this.labModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(code) {
    const { items } = this.state;
    const itemSelected = items.find(obj => obj.name === code);
    this.setState({ codeSelected: code, itemSelected });
  }

  labModal() {
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
        <Header as="h1">Lab managment</Header>
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
          addText="Añadir laboratorio"
          editText="Editar laboratorio"
          deleteText="Eliminar laboratorio"
          onAdd={this.labModal}
          onEdit={() => this.labModal(true)}
          onDelete={this.deleteModal}
          onSelected={this.handleSelected}
          keySelected="name"
        />
        <DeleteLab
          openModal={basic}
          onCloseModal={this.closeModal}
        />
        <LabModal
          openModal={openModal}
          item={itemSelected}
          onCloseModal={this.closeModal}
        />
      </div>
    );
  }
}

export default LabManagment;
