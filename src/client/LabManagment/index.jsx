import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import CommonTable from '../common/CommonTable';
import DeleteLab from './DeleteLab';
import LabModal from './LabModal';

class LabManagment extends Component {
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
    this.labModal = this.labModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleLab = this.handleLab.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    axios.get('/GSITAE/lab')
    .then((response) => {
      this.setState({ items: response.data.apis, openModal: false });
    })
    .catch(err => console.log(err.response));
  }

  handleDelete() {
    const { itemSelected } = this.state;
    axios.delete(`/GSITAE/lab/${itemSelected.name}`)
    .then((response) => {
      console.log(response);
      const { items } = this.state;
      const itemsAdded = items.filter(obj => obj.name !== itemSelected.name);
      this.setState({ items: itemsAdded, basic: false, itemSelected: {}, codeSelected: '' });
    })
    .catch(err => console.log(err.response));
  }

  handleLab(data) {
    axios.post('/GSITAE/lab', data)
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
            'client_id',
            'client_secret',
            'redirect_uri',
          ]}
          headersText={[
            'Nombre',
            'client_id',
            'client_secret',
            'redirect_uri',
          ]}
          addText="Añadir Lab"
          editText="Editar Lab"
          deleteText="Eliminar Lab"
          onAdd={this.labModal}
          onEdit={() => this.labModal(true)}
          onDelete={this.deleteModal}
          onSelected={this.handleSelected}
          keySelected="name"
          colSpan={7}
        />
        <DeleteLab
          openModal={basic}
          onCloseModal={this.closeModal}
          onDelete={this.handleDelete}
        />
        <LabModal
          openModal={openModal}
          item={itemSelected}
          onCloseModal={this.closeModal}
          onSubmit={this.handleLab}
        />
      </div>
    );
  }
}

export default LabManagment;
