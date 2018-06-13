import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import App from './containers/app';
import 'normalize.css/normalize.css';

import './index.css'

import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();
const target = document.querySelector('#app');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);
