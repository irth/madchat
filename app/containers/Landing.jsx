import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { auth, authFail } from '../actions';

import Landing from '../components/Landing';

const mapStateToProps = state => ({
  loggingIn: state.auth.loggingIn,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ auth, authFail }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
