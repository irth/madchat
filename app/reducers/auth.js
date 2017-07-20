import { REHYDRATE } from 'redux-persist/constants';
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAIL } from '../actions/auth';

const authInitialState = {
  token: null,
  logging_in: false,
  error: null,
};
const auth = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, error: null, token: null, logging_in: true };
    case AUTH_SUCCESS:
      return { ...state, token: action.token };
    case AUTH_FAIL:
      return { ...authInitialState, error: action.error };
    case REHYDRATE:
      return { ...authInitialState, token: action.payload.auth ? action.payload.auth.token : null };
    default:
      return state;
  }
};

export default auth;
