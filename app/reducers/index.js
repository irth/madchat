import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import friends from './friends';
import activeChat from './active_chat';

export default combineReducers({
  auth,
  user,
  friends,
  active_chat: activeChat,
});
