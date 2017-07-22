import { CONNECTION_REQUEST, CONNECTION_SUCCESS, CONNECTION_FAIL } from '../actions/connection';

const connectionInitialState = {
  connected: false,
  connecting: false,
  error: false,
};
const connection = (state = connectionInitialState, action) => {
  switch (action.type) {
    case CONNECTION_REQUEST:
      return { ...state, connected: false, connecting: true, error: false };
    case CONNECTION_SUCCESS:
      return { ...state, connected: true, connecting: false, error: false };
    case CONNECTION_FAIL:
      return { ...state, connected: false, connecting: false, error: true };
    default:
      return state;
  }
};

export default connection;
