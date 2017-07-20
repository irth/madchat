import { SET_ACTIVE_CHAT } from '../actions/active_chat';

const activeChatInitialState = null;
const activeChat = (state = activeChatInitialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT:
      return action.id;
    default:
      return state;
  }
};
export default activeChat;
