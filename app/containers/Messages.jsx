import { connect } from 'react-redux';

import find from 'lodash.find';

import Messages from '../components/Messages';

const mapStateToProps = (state, ownProps) => {
  const conversation = find(state.conversations, { friend: ownProps.id }) || {};
  return {
    messages: conversation.messages || [],
    unsentMessages: conversation.unsent_messages || [],
    remoteInput: conversation.remote_input || '',
    isFullyFetched: conversation.is_fully_fetched || false,
    ownId: state.user.id,
  };
};

export default connect(mapStateToProps)(Messages);
