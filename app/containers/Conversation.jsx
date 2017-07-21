import { connect } from 'react-redux';

import find from 'lodash.find';

import Conversation from '../components/Conversation';

const mapStateToProps = (state) => {
  const id = state.active_chat;
  return {
    friend: find(state.friends.list, { id }) || null,
  };
};

export default connect(mapStateToProps)(Conversation);
