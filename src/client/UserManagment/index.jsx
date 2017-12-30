import React, { Component } from 'react';
import { Header, Button, Icon, Table } from 'semantic-ui-react';
import RowItem from './RowItem';

class UserManagment extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  render() {
    return (
      <div className="inside-container">
        <Header as="h1">User managment</Header>
        <Table celled compact definition>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>Grade</Table.HeaderCell>
              <Table.HeaderCell>Roles</Table.HeaderCell>
              <Table.HeaderCell>Permissions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <RowItem />
            <RowItem />
            <RowItem />
            <RowItem />
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="6">
                <Button floated="right" icon labelPosition="left" primary size="small">
                  <Icon name="user" /> Add User
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

export default UserManagment;
