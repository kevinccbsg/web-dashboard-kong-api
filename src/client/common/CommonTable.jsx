import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';
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
    }
  }

  render() {
    const { items, keyNames } = this.props;
    const { selected } = this.state;
    if (items.length === 0) return <h3>No items</h3>;
    const headers = _.keys(_.pick(items[0], keyNames));
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
                key={obj.code}
                item={obj}
                alreadySelected={selected}
                onClickRow={this.handleIsselected}
                keyNames={keyNames}
              />
            ))
          )}
        </Table.Body>

        <FooterItem
          selected={selected}
        />
      </Table>
    );
  }
}

CommonTable.propTypes = {
  items: PropTypes.array,
  keyNames: PropTypes.array,
};

CommonTable.defaultProps = {
  items: [],
  keyNames: [],
};

export default CommonTable;
