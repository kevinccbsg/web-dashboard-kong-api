import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Button, Icon, Table, Modal } from 'semantic-ui-react';

class FooterItem extends Component {
  constructor() {
    super();
    this.state = {
      openModal: false,
      basic: false,
    };
    this.userModal = this.userModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  userModal() {
    this.setState({ openModal: true });
  }

  deleteModal() {
    this.setState({ openModal: true, basic: true });
  }

  closeModal() {
    this.setState({ openModal: false, basic: false });
  }

  render() {
    const { openModal, basic } = this.state;
    const { selected } = this.props;
    return (
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan="6">
            {!selected && (
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={this.userModal}
              >
                <Icon name="user" /> Add User
              </Button>
            )}
            {selected && (
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={this.userModal}
              >
                <Icon name="edit" /> Edit User
              </Button>
            )}
            {selected && (
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                color="red"
                size="small"
                onClick={this.deleteModal}
              >
                <Icon name="delete" /> Delete User
              </Button>
            )}
          </Table.HeaderCell>
        </Table.Row>
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
      </Table.Footer>
    );
  }
}

FooterItem.propTypes = {
  selected: PropTypes.bool,
};

FooterItem.defaultProps = {
  selected: false,
};

export default FooterItem;
