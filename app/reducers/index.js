import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import friends from './friends';
import activeChat from './active_chat';
import conversations from './conversations';
import connection from './connection';

export default combineReducers({
  auth,
  user,
  friends,
  conversations,
  connection,
  active_chat: activeChat,
});
