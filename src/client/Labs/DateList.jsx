import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Icon } from 'semantic-ui-react';
import moment from 'moment';

const DateList = (props) => {
  return (
    <List className={props.contentClassName} divided verticalAlign="middle">
      {props.items.map((obj, index) => (
        <List.Item key={index} className={props.itemClassName}>
          <List.Content>
            {moment(obj).format('LLL')}
          </List.Content>
          <List.Content>
            <Button onClick={() => props.onButtonClick(obj)} icon>
              <Icon name="remove" />
            </Button>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

DateList.propTypes = {
  contentClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  items: PropTypes.array,
  onButtonClick: PropTypes.func,
};

DateList.defaultProps = {
  contentClassName: '',
  itemClassName: '',
  items: [],
  onButtonClick: () => 0,
};

export default DateList;
