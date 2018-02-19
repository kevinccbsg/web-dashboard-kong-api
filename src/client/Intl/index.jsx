import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import messages from './messages.json';
import AppRouter from './../Router';

addLocaleData([...en, ...es]);

@connect(store => (
  {
    locale: store.intlLocale.locale,
  }
))

class Intl extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { locale } = this.props;
    return (
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
      >
        <AppRouter />
      </IntlProvider>
    );
  }
}

Intl.propTypes = {
  locale: PropTypes.string,
};

Intl.defaultProps = {
  locale: '',
};

export default Intl;
