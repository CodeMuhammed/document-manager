import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import 'babel-polyfill';

import App from './components/routes/index.jsx';
import store from './store';

import _ from './styles/main.scss';

Provider.childContextTypes = {
  store: React.PropTypes.object,
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
);
