import React from 'react';
import { connect } from 'react-redux';

import Landing from './containers/Landing';

const mapStateToProps = state => ({
  token: state.auth.token,
});

const App = ({ token }) => {
  if (token == null) {
    return <Landing />;
  }
  return (
    <h1>
      logged in {token}
    </h1>
  );
};

export default connect(mapStateToProps)(App);
