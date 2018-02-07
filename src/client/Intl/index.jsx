import React, { Component } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import messages from './messages.json';
import AppRouter from './../Router';

addLocaleData([...en, ...es]);

class Intl extends Component {
  constructor() {
    super();
    this.state = {
      locale: 'es',
    };
  }

  render() {
    const { locale } = this.state;
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

export default Intl;
