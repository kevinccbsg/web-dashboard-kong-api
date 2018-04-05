import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sidebar, Menu, Icon, Header, Dropdown } from 'semantic-ui-react';
import RoleAware from '../Router/utils/RoleAware';
import {
  all,
  admin,
} from '../Router/utils/Roles';
import {
  setLocale,
} from '../Intl/actions';

@connect(store => (
  {
    locale: store.intlLocale.locale,
    user: store.main.user,
  }
))
class SidebarMenu extends Component {
  constructor(props) {
    super();
    this.state = {
      locale: props.locale,
    };
    this.handlelanguage = this.handlelanguage.bind(this);
  }

  handlelanguage(evt, data) {
    this.setState({
      locale: data.value,
    });
    this.props.dispatch(setLocale(data.value));
  }

  render() {
    const { intl, user } = this.props;
    const dropDownList = [
      {
        key: 'es',
        text: intl.formatMessage({ id: 'language.es' }),
        value: 'es',
      },
      {
        key: 'en',
        text: intl.formatMessage({ id: 'language.en' }),
        value: 'en',
      },
    ];
    return (
      <Sidebar
        as={Menu}
        animation="push"
        width="thin"
        visible={this.props.visible}
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
                {intl.formatMessage({ id: 'menu.home' })}
              </Menu.Item>
            </Link>
          ), all)}
          {RoleAware((
            <Link to="/userprofile">
              <Menu.Item className="sidebar-item" name="user">
                <Icon name="user" />
                {intl.formatMessage({ id: 'menu.profile' })}
              </Menu.Item>
            </Link>
          ), all)}
          {RoleAware((
            <Link to="/usermanagment">
              <Menu.Item className="sidebar-item" name="user">
                <Icon name="users" />
                {intl.formatMessage({ id: 'usermanagment.title' })}
              </Menu.Item>
            </Link>
          ), admin)}
          {RoleAware((
            <Link to="/apimanagment">
              <Menu.Item className="sidebar-item" name="apis">
                <Icon name="cubes" />
                {intl.formatMessage({ id: 'apimanagment.title' })}
              </Menu.Item>
            </Link>
          ), admin)}
          {RoleAware((
            <Link to="/labmanagment">
              <Menu.Item className="sidebar-item" name="labs">
                <Icon name="lab" />
                {intl.formatMessage({ id: 'labmanagment.title' })}
              </Menu.Item>
            </Link>
          ), admin)}
          <Dropdown
            button
            className="icon language-dropdown"
            floating
            icon="world"
            options={dropDownList}
            onChange={this.handlelanguage}
            value={this.state.locale}
          />
          <div className="logout-button">
            <div className="user-data">
              {user.code}
            </div>
            <a href="/logout">
              <Icon size="big" name="log out" />
            </a>
          </div>
        </div>
      </Sidebar>
    );
  }
}

SidebarMenu.propTypes = {
  intl: intlShape.isRequired,
  visible: PropTypes.bool,
  user: PropTypes.object,
  locale: PropTypes.string,
};

SidebarMenu.defaultProps = {
  visible: false,
  user: {},
  locale: '',
};

export default injectIntl(SidebarMenu);
