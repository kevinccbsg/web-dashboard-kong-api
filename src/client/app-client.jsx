import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import store from './store';
import Intl from './Intl';
import './styles/styles.styl';

ReactDOM.render(
  <Provider store={store}>
    <Intl />
  </Provider>,
  document.getElementById('root'),
);
