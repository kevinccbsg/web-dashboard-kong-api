import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Icon, Header } from 'semantic-ui-react';
import RoleAware from '../Router/utils/RoleAware';
import {
  all,
  admin,
} from '../Router/utils/Roles';

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
    <div className="menu-list-container">
      <Menu.Item name="GSITAE">
        <Header as="h2">GSITAE</Header>
      </Menu.Item>
      {RoleAware((
        <Link to="/">
          <Menu.Item className="sidebar-item" name="grid layout">
            <Icon name="grid layout" />
            Home
          </Menu.Item>
        </Link>
      ), all)}
      {RoleAware((
        <Link to="/userprofile">
          <Menu.Item className="sidebar-item" name="user">
            <Icon name="user" />
            User Profile
          </Menu.Item>
        </Link>
      ), all)}
      {RoleAware((
        <Link to="/usermanagment">
          <Menu.Item className="sidebar-item" name="user">
            <Icon name="users" />
            Users Managment
          </Menu.Item>
        </Link>
      ), admin)}
      {RoleAware((
        <Link to="/apimanagment">
          <Menu.Item className="sidebar-item" name="apis">
            <Icon name="cubes" />
            Api Managment
          </Menu.Item>
        </Link>
      ), admin)}
      {RoleAware((
        <Link to="/labmanagment">
          <Menu.Item className="sidebar-item" name="labs">
            <Icon name="lab" />
            Lab Managment
          </Menu.Item>
        </Link>
      ), admin)}
      <div className="logout-button">
        <Link to="/logout">
          <Icon size="big" name="log out" />
        </Link>
      </div>
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
