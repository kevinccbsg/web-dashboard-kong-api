import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Checkbox, Table, Icon } from 'semantic-ui-react';
import uuid from 'uuid';
import _ from 'lodash';

class RowItem extends Component {
  constructor(props) {
    const { item, keySelected, codeSelected } = props;
    const isSelected = (item[keySelected] === codeSelected);
    super();
    this.state = {
      active: isSelected,
      selected: isSelected,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(code) {
    this.props.onClickRow(code);
  }

  render() {
    const { active, selected } = this.state;
    const { item, keyNames, keySelected } = this.props;
    return (
      <Table.Row
        active={active}
      >
        <Table.Cell>
          <Checkbox
            onClick={() => this.handleClick(item[keySelected])}
            checked={selected}
          />
        </Table.Cell>
        {keyNames.map((obj) => {
          if (_.isBoolean(item[obj]) && item[obj]) {
            return (
              <Table.Cell key={uuid.v4()}>
                <Icon color="green" name="checkmark" size="large" />
              </Table.Cell>
            );
          } else if (_.isBoolean(item[obj]) && !item[obj]) {
            return (
              <Table.Cell key={uuid.v4()}>
                <Icon color="red" name="remove" size="large" />
              </Table.Cell>
            );
          }
          return <Table.Cell key={uuid.v4()}>{item[obj]}</Table.Cell>;
        })}
      </Table.Row>
    );
  }
}

RowItem.propTypes = {
  onClickRow: PropTypes.func,
  item: PropTypes.object,
  keyNames: PropTypes.array.isRequired,
  keySelected: PropTypes.string.isRequired,
  codeSelected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

RowItem.defaultProps = {
  onClickRow: () => 0,
  item: {},
  codeSelected: '',
};

export default RowItem;
