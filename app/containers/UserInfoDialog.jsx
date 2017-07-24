// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateUser } from '../actions/user';

import UserInfoDialog from '../components/UserInfoDialog';

const mapStateToProps = state => ({
  username: state.user.username,
  displayName: state.user.display_name,
  error: state.user.error,
  updating: state.user.updating,
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
});

// TODO: add updateUser dispatch prop

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoDialog);
