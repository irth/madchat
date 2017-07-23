import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import find from 'lodash.find';

import Messages from '../components/Messages';

import { fetchMessages } from '../actions/conversations';

const mapStateToProps = (state, ownProps) => {
  const conversation = find(state.conversations, { friend: ownProps.id }) || {};
  return {
    messages: conversation.messages || [],
    unsentMessages: conversation.unsent_messages || [],
    remoteInput: conversation.input || '',
    isFullyFetched: conversation.is_fully_fetched || false,
    fetching: conversation.fetching || false,
    ownId: state.user.id,
    activeChat: state.active_chat,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchMessages }, dispatch),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  fetchMessages: before => dispatchProps.fetchMessages(stateProps.activeChat, 10, before),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Messages);
