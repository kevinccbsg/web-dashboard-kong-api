import PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';

const FooterItem = (props) => {
  const { selected } = props;
  return (
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan="6">
          {!selected && (
            <Button
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
              onClick={props.onAdd}
            >
              <Icon name="user" /> {props.addText}
            </Button>
          )}
          {selected && (
            <Button
              floated="right"
              icon
              labelPosition="left"
              color="red"
              size="small"
              onClick={props.onDelete}
            >
              <Icon name="delete" /> {props.deleteText}
            </Button>
          )}
          {selected && (
            <Button
              floated="right"
              icon
              labelPosition="left"
              size="small"
              onClick={props.onEdit}
            >
              <Icon name="edit" /> {props.editText}
            </Button>
          )}
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

FooterItem.propTypes = {
  selected: PropTypes.bool,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  addText: PropTypes.string,
  editText: PropTypes.string,
  deleteText: PropTypes.string,
};

FooterItem.defaultProps = {
  selected: false,
  onAdd: () => 0,
  onEdit: () => 0,
  onDelete: () => 0,
  addText: '',
  editText: '',
  deleteText: '',
};

export default FooterItem;
