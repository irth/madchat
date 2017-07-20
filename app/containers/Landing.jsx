import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { auth, authFail } from '../actions/auth';

import Landing from '../components/Landing';

const mapStateToProps = state => ({
  loggingIn: state.auth.logging_in,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ auth, authFail }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
