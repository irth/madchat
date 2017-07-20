import { API_URL } from './config';

// Socket connection ----------------------------------------------------------
export const CONNECT_REQUEST = 'CONNECT_REQUEST';
export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const CONNECT_FAIL = 'CONNECT_FAIL';

export const SET_RETRY_TIME = 'SET_RETRY_TIME';

export const setRetryTime = time => ({
  type: SET_RETRY_TIME,
  time,
});
// ----------------------------------------------------------------------------

// Authorization --------------------------------------------------------------
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const authSuccess = token => ({
  type: AUTH_SUCCESS,
  token,
});

export const authFail = reason => ({
  type: AUTH_FAIL,
  reason,
});

export const auth = googleToken => (dispatch) => {
  dispatch(authRequest());
  fetch(`${API_URL}/auth/google`, {
    method: 'POST',
    body: JSON.stringify({
      auth_token: googleToken,
    }),
  })
    .then((r) => {
      if (r.status === 200) {
        return r.json().then(j => dispatch(authSuccess(j.auth_token)));
      } else if (r.status === 401 || r.status === 500) {
        return r.json().then(j => dispatch(authFail(j.error)));
      }
      return Promise.reject();
    })
    .catch(() => dispatch(authFail('Unknown error')));
};
// ----------------------------------------------------------------------------

// User info ------------------------------------------------------------------
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_USERNAME = 'SET_USER_USERNAME';
export const SET_USER_DISPLAY_NAME = 'SET_USER_DISPLAY_NAME';
export const SET_USER_STATUS = 'SET_USER_STATUS';

export const setUserId = id => ({
  type: SET_USER_ID,
  id,
});

export const setUsername = username => ({
  type: SET_USER_USERNAME,
  username,
});

export const setDisplayName = displayName => ({
  type: SET_USER_DISPLAY_NAME,
  displayName,
});

export const setStatus = status => ({
  type: SET_USER_STATUS,
  status,
});
// ----------------------------------------------------------------------------

// Fetch friends --------------------------------------------------------------
export const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST';
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const FETCH_FRIENDS_FAIL = 'FETCH_FRIENDS_FAIL';
// ----------------------------------------------------------------------------

// Fetch messages -------------------------------------------------------------
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAIL = 'FETCH_MESSAGES_FAIL';
// ----------------------------------------------------------------------------

// Send message ---------------------------------------------------------------
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';
// ----------------------------------------------------------------------------
