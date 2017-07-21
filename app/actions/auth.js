import axios from 'axios';

import { API_URL } from '../config';

import { fetchFriends } from './friends';

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
  axios
    .post(`${API_URL}/auth/google`, { auth_token: googleToken })
    .then((r) => {
      dispatch(authSuccess(r.data.auth_token, r.data.user));
      dispatch(fetchFriends(r.data.auth_token));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(authFail(error.response.data.error));
      } else if (error.request) {
        dispatch(authFail('No response from server'));
      } else {
        dispatch(authFail(error.message));
      }
    });
};
