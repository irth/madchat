import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store, { persist } from './store';
import App from './App';

import { fetchFriends } from './actions/friends';

import SocketConnection from './api/socket';
import connectSocketToStore from './api/connectSocketToStore';

persist(store, () => {
  const token = store.getState().auth.token;
  if (token != null) store.dispatch(fetchFriends(token));

  const sock = new SocketConnection(token);
  connectSocketToStore(sock, store);

  sock.connect();

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
