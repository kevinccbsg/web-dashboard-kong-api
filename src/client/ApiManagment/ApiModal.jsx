import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Modal, Button, Icon, Form, Input, TextArea, Checkbox, Message } from 'semantic-ui-react';
import _ from 'lodash';

const initialState = {
  error: false,
  loading: false,
  name: '',
  description: '',
  uris: '',
  manualReference: '',
  strip_uri: false,
  preserve_host: false,
  global_credentials: false,
  upstream_url: '',
  listError: [],
  listErrorMessages: [],
};

const fields = [
  'name',
  'description',
  'uris',
  'manualReference',
  'strip_uri',
  'preserve_host',
  'upstream_url',
  'global_credentials',
];

class ApiModal extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;
    if (nextProps.item.name !== item.name) {
      this.setState({ ...nextProps.item });
    }
  }

  handleClose() {
    this.setState(initialState);
    this.props.onCloseModal();
  }

  handleChange(e, { name, value }) {
    if (name === 'strip_uri' || name === 'preserve_host' || name === 'global_credentials') {
      if (e.type === 'change') {
        const oldValue = this.state[name];
        this.setState({ [name]: !oldValue });
      }
    } else {
      const { listError, listErrorMessages } = this.state;
      const resetError = listError.filter(obj => obj !== name);
      const resetMessages = listErrorMessages.filter(obj => !obj.includes(name));
      const error = (resetMessages.length !== 0);
      this.setState({
        [name]: value,
        listError: resetError,
        listErrorMessages: resetMessages,
        error,
      });
    }
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
    return this.props.onSubmit(formFields);
  }

  render() {
    const {
      loading,
      name,
      description,
      uris,
      manualReference,
      strip_uri,
      preserve_host,
      upstream_url,
      listError,
      listErrorMessages,
      global_credentials,
      error,
    } = this.state;
    const { openModal, item } = this.props;
    const selected = !!item.name;
    return (
      <Modal
        open={openModal}
        size="small"
        onClose={this.props.onCloseModal}
      >
        <Header icon="trash outline" content="Delete Api" />
        <Modal.Content>
          <Form error={error} loading={loading}>
            <Form.Field
              id="form-input-api-name"
              control={Input}
              name="name"
              value={name}
              disabled={selected}
              onChange={this.handleChange}
              label="Api name"
              placeholder="Api name"
              error={listError.includes('name')}
            />
            <Form.Field
              id="form-input-api-description"
              control={TextArea}
              name="description"
              value={description}
              onChange={this.handleChange}
              label="Description"
              placeholder="Description"
              error={listError.includes('description')}
            />
            <Form.Group widths="equal">
              <Form.Field
                id="form-textarea-api-uris"
                control={Input}
                name="uris"
                value={uris}
                onChange={this.handleChange}
                label="uris"
                placeholder="uris"
                error={listError.includes('uris')}
              />
              <Form.Field
                id="form-textarea-api-manualReference"
                control={Input}
                name="manualReference"
                value={manualReference}
                onChange={this.handleChange}
                label="Manual Reference"
                placeholder="Manual Reference"
                error={listError.includes('manualReference')}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-textarea-api-strip_uri"
                control={Checkbox}
                name="strip_uri"
                checked={strip_uri}
                onChange={this.handleChange}
                label="strip uri"
              />
              <Form.Field
                id="form-textarea-api-preserve_host"
                control={Checkbox}
                name="preserve_host"
                checked={preserve_host}
                onChange={this.handleChange}
                label="Preserve host"
              />
              <Form.Field
                id="form-textarea-api-global_credentials"
                control={Checkbox}
                name="global_credentials"
                checked={global_credentials}
                onChange={this.handleChange}
                label="global_credentials"
              />
            </Form.Group>
            <Form.Field
              id="form-input-api-upstream_url"
              control={Input}
              name="upstream_url"
              value={upstream_url}
              onChange={this.handleChange}
              label="upstream url"
              placeholder="upstream url"
              error={listError.includes('upstream_url')}
            />
            <Message
              error
              header="Error create api"
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
            <Icon name="checkmark" /> Yes
          </Button>
          <Button
            basic
            color="red"
            disabled={loading}
            onClick={this.handleClose}
          >
            <Icon name="remove" /> No
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

ApiModal.propTypes = {
  item: PropTypes.object,
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

ApiModal.defaultProps = {
  item: {},
  openModal: false,
  onCloseModal: () => 0,
  onSubmit: () => 0,
};

export default ApiModal;
