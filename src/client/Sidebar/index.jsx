import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Icon, Header, Dropdown } from 'semantic-ui-react';
import RoleAware from '../Router/utils/RoleAware';
import {
  all,
  admin,
} from '../Router/utils/Roles';

const SidebarMenu = (props) => {
  const dropDownList = [
    {
      key: 'es',
      text: props.intl.formatMessage({ id: 'languague.es' }),
      value: 'es',
    },
    {
      key: 'en',
      text: props.intl.formatMessage({ id: 'languague.en' }),
      value: 'en',
    },
  ];
  return (
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
              {props.intl.formatMessage({ id: 'menu.home' })}
            </Menu.Item>
          </Link>
        ), all)}
        {RoleAware((
          <Link to="/userprofile">
            <Menu.Item className="sidebar-item" name="user">
              <Icon name="user" />
              {props.intl.formatMessage({ id: 'menu.profile' })}
            </Menu.Item>
          </Link>
        ), all)}
        {RoleAware((
          <Link to="/usermanagment">
            <Menu.Item className="sidebar-item" name="user">
              <Icon name="users" />
              {props.intl.formatMessage({ id: 'usermanagment.title' })}
            </Menu.Item>
          </Link>
        ), admin)}
        {RoleAware((
          <Link to="/apimanagment">
            <Menu.Item className="sidebar-item" name="apis">
              <Icon name="cubes" />
              {props.intl.formatMessage({ id: 'apimanagment.title' })}
            </Menu.Item>
          </Link>
        ), admin)}
        {RoleAware((
          <Link to="/labmanagment">
            <Menu.Item className="sidebar-item" name="labs">
              <Icon name="lab" />
              {props.intl.formatMessage({ id: 'labmanagment.title' })}
            </Menu.Item>
          </Link>
        ), admin)}
        <Dropdown
          button
          className="icon languague-dropdown"
          floating
          icon="world"
          options={dropDownList}
        />
        <div className="logout-button">
          <Link to="/logout">
            <Icon size="big" name="log out" />
          </Link>
        </div>
      </div>
    </Sidebar>
  );
};

SidebarMenu.propTypes = {
  intl: intlShape.isRequired,
  visible: PropTypes.bool,
};

SidebarMenu.defaultProps = {
  visible: false,
};

export default injectIntl(SidebarMenu);
