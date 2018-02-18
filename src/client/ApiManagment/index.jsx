import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import CommonTable from '../common/CommonTable';
import DeleteApi from './DeleteApi';
import ApiModal from './ApiModal';

class ApiManagment extends Component {
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
    this.apiModal = this.apiModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleApi = this.handleApi.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    axios.get('/GSITAE/apis')
    .then((response) => {
      this.setState({ items: response.data.apis, openModal: false });
    })
    .catch(err => console.log(err.response));
  }

  handleDelete() {
    const { itemSelected } = this.state;
    axios.delete(`/GSITAE/api/${itemSelected.name}`)
    .then((response) => {
      console.log(response);
      const { items } = this.state;
      const itemsAdded = items.filter(obj => obj.name !== itemSelected.name);
      this.setState({ items: itemsAdded, basic: false, itemSelected: {}, codeSelected: '' });
    })
    .catch(err => console.log(err.response));
  }

  handleApi(data) {
    axios.post('/GSITAE/api', data)
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
    const { intl } = this.props;
    return (
      <div className="inside-container">
        <Header as="h1">{intl.formatMessage({ id: 'apimanagment.title' })}</Header>
        <CommonTable
          items={items}
          keyNames={[
            'name',
            'uris',
            'upstream_url',
            'description',
            'strip_uri',
            'preserve_host',
            'global_credentials',
          ]}
          headersText={[
            'Nombre',
            'uris',
            'upstream_url',
            'description',
            'strip_uri',
            'preserve_host',
            'Global_credentials',
          ]}
          addText={intl.formatMessage({ id: 'apimanagment.add' })}
          editText={intl.formatMessage({ id: 'apimanagment.edit' })}
          deleteText={intl.formatMessage({ id: 'apimanagment.delete' })}
          onAdd={this.apiModal}
          onEdit={() => this.apiModal(true)}
          onDelete={this.deleteModal}
          onSelected={this.handleSelected}
          noItems={intl.formatMessage({ id: 'common.noitems' })}
          keySelected="name"
          colSpan={7}
        />
        <DeleteApi
          contentHeader={intl.formatMessage({ id: 'apimanagment.delete' })}
          leftLabel={intl.formatMessage({ id: 'common.yes' })}
          rightLabel={intl.formatMessage({ id: 'common.no' })}
          title={intl.formatMessage({ id: 'apimanagment.delete.title' })}
          openModal={basic}
          onCloseModal={this.closeModal}
          onDelete={this.handleDelete}
        />
        <ApiModal
          openModal={openModal}
          item={itemSelected}
          onCloseModal={this.closeModal}
          onSubmit={this.handleApi}
        />
      </div>
    );
  }
}

ApiManagment.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ApiManagment);
