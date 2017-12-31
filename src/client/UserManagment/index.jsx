import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import CommonTable from '../common/CommonTable';

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
    };
  }

  render() {
    const { items } = this.state;
    return (
      <div className="inside-container">
        <Header as="h1">User managment</Header>
        <CommonTable
          items={items}
          keyNames={[
            'code',
            'name',
            'email',
            'grade',
            'roles',
            'permissions',
          ]}
        />
      </div>
    );
  }
}

export default UserManagment;
