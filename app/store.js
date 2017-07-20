import { createStore, applyMiddleware, compose } from 'redux';

import { persistStore, autoRehydrate } from 'redux-persist';

import thunk from 'redux-thunk';

import reducers from './reducers/';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk), autoRehydrate()));

export const persist = (s, cb) => persistStore(s, { whitelist: ['auth'] }, cb);

export default store;
