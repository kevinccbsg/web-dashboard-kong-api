import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Sidebar, Segment, Button } from 'semantic-ui-react';
import SidebarMenu from './../Sidebar';
import Labs from '../Labs';
import UserProfile from './../UserProfile';

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
            <Switch>
              <Route exact path="/" component={Labs} />
              <Route path="/userprofile" component={UserProfile} />
            </Switch>
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
