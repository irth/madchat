import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import thunk from 'redux-thunk';

import { Provider } from 'react-redux';

import App from './App';

import { fetchFriends } from './actions/friends';

import SocketConnection from './api/socket';
import connectSocketToStore from './api/connectSocketToStore';

import reducers from './reducers/';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const socket = new SocketConnection();

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({ socket })), autoRehydrate()),
);

connectSocketToStore(socket, store);

persistStore(store, { whitelist: ['auth', 'user'] }, () => {
  const token = store.getState().auth.token;
  if (token != null) store.dispatch(fetchFriends(token));

  /*
   * Render only after hydration - avoids a bug where react-google-login is
   * mounted and then quickly unmounted which results in a call to setState
   * on an unmounted component
   */
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app'),
  );
});
