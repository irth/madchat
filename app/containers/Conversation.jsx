import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import find from 'lodash.find';

import Conversation from '../components/Conversation';
import { sendMessage } from '../actions/conversations';

const mapStateToProps = (state) => {
  const id = state.active_chat;
  return {
    friend: find(state.friends.list, { id }) || null,
    authToken: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ sendMessage }, dispatch),
});

const mergeProps = (stateProps, dispatchProps) => ({
  friend: stateProps.friend,
  sendMessage: msg => dispatchProps.sendMessage(stateProps.authToken, stateProps.friend.id, msg),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Conversation);
