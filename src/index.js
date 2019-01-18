import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import 'normalize.css/normalize.css';
import LogRocket from 'logrocket';

import { store, persistor, history } from './store';
import App from './containers/app';
import './index.css'

import registerServiceWorker from './registerServiceWorker';

LogRocket.init('s6bjlt/nostromo');

registerServiceWorker();
const target = document.querySelector('#app');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  target
);
