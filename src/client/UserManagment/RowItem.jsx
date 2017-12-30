import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Checkbox, Table } from 'semantic-ui-react';

class RowItem extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      selected: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { active, selected } = this.state;
    this.setState({
      active: !active,
      selected: !selected,
    });
  }

  render() {
    const { active, selected } = this.state;
    return (
      <Table.Row
        active={active}
      >
        <Table.Cell>
          <Checkbox
            onClick={this.handleClick}
            checked={selected}
          />
        </Table.Cell>
        <Table.Cell>50083</Table.Cell>
        <Table.Cell>Kevin Julián Martinez Escobar</Table.Cell>
        <Table.Cell>kevinjulian.martinezescobar@alumnos.upm.es</Table.Cell>
        <Table.Cell>Electronica industrial y automatica</Table.Cell>
        <Table.Cell>Admin</Table.Cell>
        <Table.Cell>Admin, Peltier, FPGA, Compilador C</Table.Cell>
      </Table.Row>
    );
  }
}

export default RowItem;
