import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Modal, Button, Icon } from 'semantic-ui-react';

class DeleteUser extends Component {
  constructor() {
    super();
    this.state = {
      errorText: '',
      loading: false,
    };
  }

  render() {
    const { openModal } = this.props;
    return (
      <Modal
        open={openModal}
        basic
        size="small"
        onClose={this.props.onCloseModal}
      >
        <Header icon="trash outline" content="Delete User" />
        <Modal.Content>
          <p>Do you want to delete this User?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Yes
          </Button>
          <Button
            basic
            color="red"
            inverted
            onClick={this.props.onCloseModal}
          >
            <Icon name="remove" /> No
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

DeleteUser.propTypes = {
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

DeleteUser.defaultProps = {
  openModal: false,
  onCloseModal: () => 0,
};

export default DeleteUser;
