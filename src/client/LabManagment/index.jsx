import React, { Component } from 'react';
import { Header, Modal, Button, Icon } from 'semantic-ui-react';
import CommonTable from '../common/CommonTable';

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
      openModal: false,
      basic: false,
      edit: false,
    };
    this.labModal = this.labModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(code) {
    this.setState({ codeSelected: code });
  }

  labModal() {
    this.setState({ openModal: true });
  }

  deleteModal() {
    this.setState({ openModal: true, basic: true });
  }

  closeModal() {
    this.setState({ openModal: false, basic: false, edit: false });
  }

  render() {
    const { items, openModal, basic } = this.state;
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
        <Modal
          open={openModal}
          basic={basic}
          size="small"
          onClose={this.closeModal}
        >
          <Header icon="delete" content="Delete Users" />
          <Modal.Content>
            <p>Your inbox is getting full, would you
            like us to enable automatic archiving of old messages?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default LabManagment;
