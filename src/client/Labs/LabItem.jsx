import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'semantic-ui-react';
import moment from 'moment';

class LabItem extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
    this.handleExpanded = this.handleExpanded.bind(this);
  }

  handleExpanded() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const { expanded } = this.state;
    const { item } = this.props;
    const contentText = (expanded) ? 'lab-item open' : 'lab-item';
    return (
      <Card className={contentText}>
        <Card.Content>
          <Card.Header>
            <a href={item.url} rel="noopener noreferrer" target="_blank">
              {item.name}
            </a>
          </Card.Header>
          <Card.Meta>
            <span className="date">
              {moment(item.created_at).format('L')}
            </span>
          </Card.Meta>
          <Card.Description className="lab-description">
            {item.description}
          </Card.Description>
        </Card.Content>
        <Card.Content className="icon-container" extra>
          <Button
            className="button-item"
            size="large"
            basic
            icon="file pdf outline"
          />
          {expanded && (
            <Button
              className="button-item"
              onClick={this.handleExpanded}
              size="large"
              icon="expand"
              basic
            />
          )}
          {!expanded && (
            <Button
              className="button-item"
              onClick={this.handleExpanded}
              size="large"
              icon="compress"
              basic
            />
          )}
        </Card.Content>
      </Card>
    );
  }
}

LabItem.propTypes = {
  item: PropTypes.object,
};

LabItem.defaultProps = {
  item: {},
};

export default LabItem;
