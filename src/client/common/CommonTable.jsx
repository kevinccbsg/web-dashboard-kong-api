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
    } = this.props;
    const { selected, codeSelected } = this.state;
    if (items.length === 0) return <h3>No items</h3>;
    const headers = headersText || _.keys(_.pick(items[0], keyNames));
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
        </Table.Body>

        <FooterItem
          selected={selected}
          addText={addText}
          editText={editText}
          deleteText={deleteText}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
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
};

export default CommonTable;
