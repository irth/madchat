import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store, { persist } from './store';
import App from './App';

persist(store, () => {
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
