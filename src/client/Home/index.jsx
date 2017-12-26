import React, { Component } from 'react';
import { Sidebar, Segment, Button, Header } from 'semantic-ui-react';
import SidebarMenu from '../Sidebar';

class Home extends Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible } = this.state;
    return (
      <Sidebar.Pushable
        className="home-container"
        as={Segment}
      >
        <SidebarMenu visible={visible} />
        <Sidebar.Pusher>
          <Segment basic>
            <Header as="h3">Application Content</Header>
            <Button
              size="big"
              color="black"
              className="toggle-button"
              onClick={this.toggleVisibility}
              icon="sidebar"
            />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default Home;
