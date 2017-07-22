import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import find from 'lodash.find';

import Conversation from '../components/Conversation';
import { sendMessage, sendInput } from '../actions/conversations';

const mapStateToProps = state => ({
  friend: find(state.friends.list, { id: state.active_chat }) || null,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ sendMessage, sendInput }, dispatch),
});

const mergeProps = (stateProps, dispatchProps) => ({
  friend: stateProps.friend,
  sendMessage: msg => dispatchProps.sendMessage(stateProps.friend.id, msg),

  sendInput: value => dispatchProps.sendInput(stateProps.friend.id, value),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Conversation);
