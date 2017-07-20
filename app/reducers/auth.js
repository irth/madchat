import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAIL } from '../actions';

const authInitialState = {
  token: null,
  loggingIn: false,
  error: null,
};
const auth = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, error: null, token: null, loggingIn: true };
    case AUTH_SUCCESS:
      return { ...state, token: action.token };
    case AUTH_FAIL:
      return { ...authInitialState, error: action.error };
    default:
      return state;
  }
};

export default auth;
