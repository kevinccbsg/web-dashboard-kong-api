import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

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
    const contentText = (expanded) ? 'lab-item open' : 'lab-item';
    return (
      <Card className={contentText}>
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
            Matthew is a musician living in Nashville. Matthew is a musician living in Nashville.
            Matthew is a musician living in Nashville.
            Matthew is a musician living in Nashville.
            Matthew is a musician living in Nashville.
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

export default LabItem;
