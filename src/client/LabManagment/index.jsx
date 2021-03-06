import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
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
    axios.get('/GSITAE/labs/admin')
    .then((response) => {
      const items = response.data.labs.filter(obj => obj);
      this.setState({ items, openModal: false });
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
    const { edit } = this.state;
    if (edit) {
      const { itemSelected } = this.state;
      return axios.patch(`/GSITAE/lab/${itemSelected.name}`, data)
      .then((response) => {
        console.log(response);
        const { items } = this.state;
        const itemsAdded = items.map((obj) => {
          if (obj.name === response.data.name) {
            return {
              ...obj,
              ...response.data,
            };
          }
          return { ...obj };
        });
        this.setState({ items: itemsAdded, openModal: false });
      })
      .catch(err => console.log(err.response));
    }
    return axios.post('/GSITAE/lab', data)
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

  labModal(edit) {
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
        <Header as="h1">{intl.formatMessage({ id: 'labmanagment.title' })}</Header>
        <CommonTable
          items={items}
          keyNames={[
            'name',
            'description',
            'client_id',
            'client_secret',
            'redirect_uri',
          ]}
          headersText={[
            'Nombre',
            'description',
            'client_id',
            'client_secret',
            'redirect_uri',
          ]}
          addText={intl.formatMessage({ id: 'labmanagment.add' })}
          editText={intl.formatMessage({ id: 'labmanagment.edit' })}
          deleteText={intl.formatMessage({ id: 'labmanagment.delete' })}
          onAdd={() => this.labModal(false)}
          onEdit={() => this.labModal(true)}
          onDelete={this.deleteModal}
          onSelected={this.handleSelected}
          noItems={intl.formatMessage({ id: 'common.noitems' })}
          keySelected="name"
          colSpan={7}
        />
        <DeleteLab
          contentHeader={intl.formatMessage({ id: 'labmanagment.delete' })}
          leftLabel={intl.formatMessage({ id: 'common.yes' })}
          rightLabel={intl.formatMessage({ id: 'common.no' })}
          title={intl.formatMessage({ id: 'labmanagment.delete.title' })}
          openModal={basic}
          onCloseModal={this.closeModal}
          onDelete={this.handleDelete}
        />
        <LabModal
          openModal={openModal}
          item={itemSelected}
          onCloseModal={this.closeModal}
          onSubmit={this.handleLab}
          edit={edit}
        />
      </div>
    );
  }
}

LabManagment.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(LabManagment);
