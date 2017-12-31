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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.alreadySelected) {
      this.setState({
        active: false,
        selected: false,
      });
    }
  }

  handleClick(code) {
    const { active, selected } = this.state;
    const { alreadySelected } = this.props;
    if (!alreadySelected) {
      this.setState({
        active: !active,
        selected: !selected,
      });
    }
    this.props.onClickRow(code);
  }

  render() {
    const { active, selected } = this.state;
    const { item } = this.props;
    return (
      <Table.Row
        active={active}
      >
        <Table.Cell>
          <Checkbox
            onClick={() => this.handleClick(item.code)}
            checked={selected}
          />
        </Table.Cell>
        <Table.Cell>{item.code}</Table.Cell>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.email}</Table.Cell>
        <Table.Cell>{item.grade}</Table.Cell>
        <Table.Cell>{item.roles}</Table.Cell>
        <Table.Cell>{item.permissions}</Table.Cell>
      </Table.Row>
    );
  }
}

RowItem.propTypes = {
  onClickRow: PropTypes.func,
  item: PropTypes.object,
  alreadySelected: PropTypes.bool,
};

RowItem.defaultProps = {
  onClickRow: () => 0,
  item: {},
  alreadySelected: false,
};

export default RowItem;
