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
];

class LabModal extends Component {
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
    if (name === 'strip_uri' || name === 'preserve_host') {
      if (e.type === 'change') {
        const oldValue = this.state[name];
        this.setState({ [name]: !oldValue });
      }
    } else {
      this.setState({ [name]: value });
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
    return console.log('Send form');
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
        <Header icon="trash outline" content="Delete Lab" />
        <Modal.Content>
          <Form error={error} loading={loading}>
            <Form.Field
              id="form-input-lab-name"
              control={Input}
              name="name"
              value={name}
              disabled={selected}
              onChange={this.handleChange}
              label="Lab name"
              placeholder="Lab name"
              error={listError.includes('name')}
            />
            <Form.Field
              id="form-input-lab-description"
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
                id="form-textarea-lab-uris"
                control={Input}
                name="uris"
                value={uris}
                onChange={this.handleChange}
                label="uris"
                placeholder="uris"
                error={listError.includes('uris')}
              />
              <Form.Field
                id="form-textarea-lab-manualReference"
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
                id="form-textarea-lab-strip_uri"
                control={Checkbox}
                name="strip_uri"
                checked={strip_uri}
                onChange={this.handleChange}
                label="strip uri"
              />
              <Form.Field
                id="form-textarea-lab-preserve_host"
                control={Checkbox}
                name="preserve_host"
                checked={preserve_host}
                onChange={this.handleChange}
                label="Preserve host"
              />
            </Form.Group>
            <Form.Field
              id="form-input-lab-upstream_url"
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
              header="Error create Lab"
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

LabModal.propTypes = {
  item: PropTypes.object,
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

LabModal.defaultProps = {
  item: {},
  openModal: false,
  onCloseModal: () => 0,
};

export default LabModal;
