import {
  FETCH_FRIENDS_REQUEST,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_FAIL,
  UPDATE_STATUS,
} from '../actions/friends';

import { AUTH_FAIL } from '../actions/auth';

const friendsInitialState = {
  fetching: false,
  list: [],
};

const friends = (state = friendsInitialState, action) => {
  switch (action.type) {
    case FETCH_FRIENDS_REQUEST:
      return { ...state, fetching: true };
    case FETCH_FRIENDS_SUCCESS:
      return { ...state, fetching: false, list: action.friends };
    case FETCH_FRIENDS_FAIL:
      return { ...state, fetching: false };
    case UPDATE_STATUS:
      return {
        ...state,
        list: state.list.map((friend) => {
          if (friend.id !== action.friend) return friend;
          return { ...friend, status: action.status };
        }),
      };
    case AUTH_FAIL:
      return friendsInitialState;
    default:
      return state;
  }
};
export default friends;
