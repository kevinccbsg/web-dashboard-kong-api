import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Sidebar, Segment, Button } from 'semantic-ui-react';
import SidebarMenu from './../Sidebar';
import Labs from '../Labs';
import UserProfile from './../UserProfile';
import UserManagment from './../UserManagment';
import ApiManagment from './../ApiManagment';
import LabManagment from './../LabManagment';
import {
  admin,
  all,
} from '../Router/utils/Roles';
import RoleAware from '../Router/utils/RoleAware';


const Routes = () => (
  <div>
    <Route exact path="/" component={RoleAware(Labs, all)} />
    <Route path="/userprofile" component={RoleAware(UserProfile, all)} />
    <Route path="/apimanagment" component={RoleAware(ApiManagment, admin)} />
    <Route path="/usermanagment" component={RoleAware(UserManagment, admin)} />
    <Route path="/labmanagment" component={RoleAware(LabManagment, admin)} />
  </div>
);

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
            <Routes />
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
