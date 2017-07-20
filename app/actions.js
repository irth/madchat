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

export const authSuccess = (token, user) => ({
  type: AUTH_SUCCESS,
  token,
  user,
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
        return r.json().then(j => dispatch(authSuccess(j.auth_token, j.user)));
      } else if (r.status === 401 || r.status === 500) {
        return r.json().then(j => dispatch(authFail(j.error)));
      }
      return Promise.reject();
    })
    .catch(() => dispatch(authFail('Unknown error')));
};
// ----------------------------------------------------------------------------

// User info ------------------------------------------------------------------
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const SET_USER = 'SET_USER';

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
export const updateUserFail = error => ({ type: UPDATE_USER_FAIL, error });

export const updateUser = (authToken, user) => (dispatch) => {
  dispatch(updateUserRequest());
  fetch(`${API_URL}/profile`, {
    method: 'PATCH',
    body: JSON.stringify({
      auth_token: authToken,
      ...user,
    }),
  })
    .then((r) => {
      r
        .json()
        .then((j) => {
          if (r.status !== 200) dispatch(updateUserFail({ code: r.status, message: j.error }));
          else dispatch(setUser(j));
        })
        .catch(() => dispatch(updateUserFail({ code: r.status, error: 'Unknown error' })));
    })
    .catch(() => dispatch(updateUserFail({ code: null, error: 'Unknown error' })));
};
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
