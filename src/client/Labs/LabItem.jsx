import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

class LabItem extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    const { expanded } = this.state;
    return (
      <Card className="lab-item">
        <Card.Content>
          <Card.Header>
            Matthew
          </Card.Header>
          <Card.Meta>
            <span className="date">
              Joined in 2015
            </span>
          </Card.Meta>
          <Card.Description className="lab-description">
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content className="icon-container" extra>
          <Icon size="large" name="file pdf outline" />
          {expanded && (
            <Icon size="large" name="expand" />
          )}
          {!expanded && (
            <Icon size="large" name="compress" />
          )}
        </Card.Content>
      </Card>
    );
  }
}

export default LabItem;
