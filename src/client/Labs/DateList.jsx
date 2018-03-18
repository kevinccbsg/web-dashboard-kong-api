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
            {props.showApp && (
              <div className="application-title">
                {obj.application}
              </div>
            )}
            <div>
            {moment(obj.selectedDate).format('LLL')}
            </div>
          </List.Content>
          <List.Content>
            <Button onClick={() => props.onButtonClick(obj.selectedDate, obj.application)} icon>
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
  showApp: PropTypes.bool,
  itemClassName: PropTypes.string,
  items: PropTypes.array,
  onButtonClick: PropTypes.func,
};

DateList.defaultProps = {
  showApp: false,
  contentClassName: '',
  itemClassName: '',
  items: [],
  onButtonClick: () => 0,
};

export default DateList;
