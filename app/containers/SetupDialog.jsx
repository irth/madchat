import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateUser } from '../actions/user';

import SetupDialog from '../components/SetupDialog';

const mapStateToProps = state => ({
  username: state.user.username,
  displayName: state.user.display_name,
  error: state.user.error,
  updating: state.user.updating,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateUser }, dispatch),
});

// TODO: add updateUser dispatch prop

export default connect(mapStateToProps, mapDispatchToProps)(SetupDialog);
