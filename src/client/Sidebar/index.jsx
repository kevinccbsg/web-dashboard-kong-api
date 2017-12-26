import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Icon, Header } from 'semantic-ui-react';

const SidebarMenu = props => (
  <Sidebar
    as={Menu}
    animation="push"
    width="thin"
    visible={props.visible}
    icon="labeled"
    vertical
    inverted
    className="sidebar-container"
  >
    <Menu.Item name="GSITAE">
      <Header as="h2">GSITAE</Header>
    </Menu.Item>
    <Menu.Item className="sidebar-item" name="grid layout">
      <Icon name="grid layout" />
      Home
    </Menu.Item>
    <Menu.Item className="sidebar-item" name="user">
      <Icon name="user" />
      User Profile
    </Menu.Item>
    <div className="logout-button">
      <Link to="/logout">
        <Icon size="big" name="log out" />
      </Link>
    </div>
  </Sidebar>
);

SidebarMenu.propTypes = {
  visible: PropTypes.bool,
};

SidebarMenu.defaultProps = {
  visible: false,
};

export default SidebarMenu;
