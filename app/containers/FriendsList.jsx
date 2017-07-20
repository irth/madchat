import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActiveChat } from '../actions/active_chat';

import FriendsList from '../components/FriendsList';

const mapStateToProps = state => ({
  fetching: state.friends.fetching,
  friends: state.friends.list,
  activeChat: state.active_chat,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ setActiveChat }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
