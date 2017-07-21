import sortBy from 'lodash.sortby';
import filter from 'lodash.filter';
import find from 'lodash.find';

import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  ADD_MESSAGE,
  SET_INPUT,
} from '../actions/conversations';

import { AUTH_FAIL } from '../actions/auth';

const conversationInitialState = {
  friend: null,
  fetching: false,
  is_fully_fetched: false,
  input: '',
  messages: [],
  unsent_messages: [],
};

const conversationReducer = (state = conversationInitialState, action) => {
  switch (action.type) {
    // Fetching messsages...
    case FETCH_MESSAGES_REQUEST:
      return { ...state, fetching: true };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        fetching: false,
        messages: sortBy(
          [
            ...action.messages,
            ...state.messages.filter(m => find(action.messages, { id: m.id }) == null),
          ],
          'id',
        ),
      };
    case FETCH_MESSAGES_FAIL:
      return { ...state, fetching: false };

    // Sending messages...
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        unsent_messages: [...state.unsent_messages, { id: action.id, message: action.message }],
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        unsent_messages: filter(state.unsent_messages, m => m.id !== action.id),
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        unsent_messages: state.unsent_messages.map((item) => {
          if (item.id !== action.id) return item;
          return {
            ...item,
            error: true,
          };
        }),
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: sortBy(
          [...state.messages.filter(m => m.id !== action.message.id), action.message],
          'id',
        ),
      };
    case SET_INPUT:
      return {
        ...state,
        input: action.input,
      };
    default:
      return state;
  }
};

const conversationsInitialState = {};
const conversations = (state = conversationsInitialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
    case FETCH_MESSAGES_SUCCESS:
    case FETCH_MESSAGES_FAIL:
    case SEND_MESSAGE_REQUEST:
    case SEND_MESSAGE_SUCCESS:
    case SEND_MESSAGE_FAIL:
    case ADD_MESSAGE:
    case SET_INPUT:
      return {
        ...state,
        [action.friend]: conversationReducer(
          state[action.friend] || {
            ...conversationInitialState,
            friend: action.friend,
          },
          action,
        ),
      };
    case AUTH_FAIL:
      return conversationsInitialState;
    default:
      return state;
  }
};
export default conversations;
