import React from 'react';
import { Header, Button, Checkbox, Icon, Table } from 'semantic-ui-react';

const UserManagment = () => (
  <div className="inside-container">
    <Header as="h1">User managment</Header>
    <Table celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>Enabled</Table.HeaderCell>
          <Table.HeaderCell>Code</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>E-mail</Table.HeaderCell>
          <Table.HeaderCell>Grade</Table.HeaderCell>
          <Table.HeaderCell>Roles</Table.HeaderCell>
          <Table.HeaderCell>Permissions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>50083</Table.Cell>
          <Table.Cell>Kevin Julián Martinez Escobar</Table.Cell>
          <Table.Cell>kevinjulian.martinezescobar@alumnos.upm.es</Table.Cell>
          <Table.Cell>Electronica industrial y automatica</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
          <Table.Cell>Admin, Peltier, FPGA, Compilador C</Table.Cell>
        </Table.Row>
        <Table.Row active>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>50083</Table.Cell>
          <Table.Cell>Kevin Julián Martinez Escobar</Table.Cell>
          <Table.Cell>kevinjulian.martinezescobar@alumnos.upm.es</Table.Cell>
          <Table.Cell>Electronica industrial y automatica</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
          <Table.Cell>Admin, Peltier, FPGA, Compilador C</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>50083</Table.Cell>
          <Table.Cell>Kevin Julián Martinez Escobar</Table.Cell>
          <Table.Cell>kevinjulian.martinezescobar@alumnos.upm.es</Table.Cell>
          <Table.Cell>Electronica industrial y automatica</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
          <Table.Cell>Admin, Peltier, FPGA, Compilador C</Table.Cell>
        </Table.Row>
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

export default UserManagment;
