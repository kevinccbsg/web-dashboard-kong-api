import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';
import uuid from 'uuid';
import RowItem from './RowItem';
import FooterItem from './FooterItem';

class CommonTable extends Component {
  constructor() {
    super();
    this.state = {
      codeSelected: '',
    };
    this.handleIsselected = this.handleIsselected.bind(this);
  }

  handleIsselected(code) {
    const { codeSelected } = this.state;
    if (code === codeSelected) {
      this.setState({ codeSelected: '' });
    } else if (code !== codeSelected) {
      this.setState({ codeSelected: code });
      this.props.onSelected(code);
    }
  }

  render() {
    const {
      items,
      keyNames,
      headersText,
      addText,
      editText,
      deleteText,
      onAdd,
      onEdit,
      onDelete,
      keySelected,
      colSpan,
    } = this.props;
    const { codeSelected } = this.state;
    const headers = headersText || _.keys(_.pick(items[0], keyNames));
    const isSelected = !!items.find(obj => obj[keySelected] === codeSelected);
    return (
      <Table celled compact definition>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            {headers.map(obj => (
              <Table.HeaderCell key={obj}>{obj}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {(items.length !== 0) && (
            items.map(obj => (
              <RowItem
                key={uuid.v4()}
                item={obj}
                onClickRow={this.handleIsselected}
                keyNames={keyNames}
                keySelected={keySelected}
                codeSelected={codeSelected}
              />
            ))
          )}
          {(items.length === 0) && (
            <Table.Row>
              <Table.Cell />
              <Table.Cell
                colSpan={colSpan}
              >
                <h3>No items</h3>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>

        <FooterItem
          selected={isSelected}
          addText={addText}
          editText={editText}
          deleteText={deleteText}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
          colSpan={colSpan}
        />
      </Table>
    );
  }
}

CommonTable.propTypes = {
  keySelected: PropTypes.string.isRequired,
  items: PropTypes.array,
  keyNames: PropTypes.array,
  headersText: PropTypes.array,
  addText: PropTypes.string,
  editText: PropTypes.string,
  deleteText: PropTypes.string,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onSelected: PropTypes.func,
  colSpan: PropTypes.number,
};

CommonTable.defaultProps = {
  items: [],
  keyNames: [],
  headersText: [],
  addText: '',
  editText: '',
  deleteText: '',
  onAdd: () => 0,
  onEdit: () => 0,
  onDelete: () => 0,
  onSelected: () => 0,
  colSpan: 6,
};

export default CommonTable;
