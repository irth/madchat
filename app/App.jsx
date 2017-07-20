import React from 'react';
import { connect } from 'react-redux';

import Landing from './containers/Landing';
import Chat from './components/Chat';

const mapStateToProps = state => ({
  token: state.auth.token,
});

const App = ({ token }) => {
  if (token == null) {
    return <Landing />;
  }
  return <Chat />;
};

export default connect(mapStateToProps)(App);
