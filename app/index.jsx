import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store, { persist } from './store';
import App from './App';

import { fetchFriends } from './actions/friends';

import { fetchMessages } from './actions/conversations';

window.f = fetchMessages;
window.s = store;
persist(store, () => {
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
