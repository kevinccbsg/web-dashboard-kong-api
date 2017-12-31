import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react';
import RowItem from './RowItem';
import FooterItem from './FooterItem';

class UserManagment extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        {
          code: 50083,
          name: 'Kevin Julián Martinez Escobar',
          email: 'kevinjulian.martinezescobar@alumnos.upm.es',
          grade: 'Electronica industrial y automatica',
          roles: 'Admin',
          permissions: 'Admin, Peltier, FPGA, Compilador C',
        },
        {
          code: 50084,
          name: 'Kevin Julián Martinez Escobar',
          email: 'kevinjulian.martinezescobar@alumnos.upm.es',
          grade: 'Electronica industrial y automatica',
          roles: 'Admin',
          permissions: 'Admin, Peltier, FPGA, Compilador C',
        },
      ],
      codeSelected: '',
      selected: false,
    };
    this.handleIsselected = this.handleIsselected.bind(this);
  }

  handleIsselected(code) {
    const { codeSelected, selected } = this.state;
    if ((code === codeSelected) && selected) {
      this.setState({ codeSelected: '', selected: false });
    } else if ((code !== codeSelected) && !selected) {
      this.setState({ codeSelected: code, selected: true });
    }
  }

  render() {
    const { items, selected } = this.state;
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
            {(items.length !== 0) && (
              items.map(obj => (
                <RowItem
                  key={obj.code}
                  item={obj}
                  alreadySelected={selected}
                  onClickRow={this.handleIsselected}
                />
              ))
            )}
          </Table.Body>

          <FooterItem
            selected={selected}
          />
        </Table>
      </div>
    );
  }
}

export default UserManagment;
