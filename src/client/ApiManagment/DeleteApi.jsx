import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Modal, Button, Icon } from 'semantic-ui-react';

class DeleteApi extends Component {
  constructor() {
    super();
    this.state = {
      errorText: '',
      loading: false,
    };
  }

  render() {
    const { openModal, title, leftLabel, rightLabel } = this.props;
    return (
      <Modal
        open={openModal}
        basic
        size="small"
        onClose={this.props.onCloseModal}
      >
        <Header icon="trash outline" content={this.props.contentHeader} />
        <Modal.Content>
          <p>{title}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={this.props.onDelete}
          >
            <Icon name="checkmark" /> {leftLabel}
          </Button>
          <Button
            basic
            color="red"
            inverted
            onClick={this.props.onCloseModal}
          >
            <Icon name="remove" /> {rightLabel}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

DeleteApi.propTypes = {
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onDelete: PropTypes.func,
  title: PropTypes.string,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  contentHeader: PropTypes.string,
};

DeleteApi.defaultProps = {
  openModal: false,
  onCloseModal: () => 0,
  onDelete: () => 0,
  title: 'Do you want to delete this?',
  leftLabel: 'yes',
  rightLabel: 'no',
  contentHeader: '',
};

export default DeleteApi;
