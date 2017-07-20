import {
  SET_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAIL,
  AUTH_FAIL,
  AUTH_SUCCESS,
} from '../actions';

const userInitialState = {
  display_name: '',
  username: null,
  id: null,
  status: 'unavailable',
  updating: false,
  error: null,
};

const user = (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER:
    case AUTH_SUCCESS:
      return { ...state, ...action.user, updating: false, error: null };
    case AUTH_FAIL:
      return userInitialState;
    case UPDATE_USER_REQUEST:
      return { ...state, updating: true, error: null };
    case UPDATE_USER_FAIL:
      return { ...state, updating: false, error: action.error };
    default:
      return state;
  }
};

export default user;
