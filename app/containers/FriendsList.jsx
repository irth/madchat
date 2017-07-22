import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setActiveChat } from '../actions/active_chat';
import { fetchMessages } from '../actions/conversations';

import FriendsList from '../components/FriendsList';

const mapStateToProps = state => ({
  fetching: state.friends.fetching,
  friends: state.friends.list,
  activeChat: state.active_chat,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ setActiveChat, fetchMessages }, dispatch),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  setActiveChat: (id) => {
    dispatchProps.setActiveChat(id);
    dispatchProps.fetchMessages(id, 30);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FriendsList);
