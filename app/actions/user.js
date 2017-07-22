import axios from 'axios';

import { API_URL } from '../config';

import { authFail } from './auth';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const SET_USER = 'SET_USER';

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
export const updateUserFail = (code, message) => ({
  type: UPDATE_USER_FAIL,
  error: { code, message },
});

export const updateUser = user => (dispatch, getState) => {
  const authToken = getState().auth.token;
  dispatch(updateUserRequest());
  axios
    .patch(`${API_URL}/profile`, { auth_token: authToken, ...user })
    .then(r => dispatch(setUser(r.data)))
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) dispatch(authFail(401, 'Unauthorized.'));
        else dispatch(updateUserFail(error.response.status, error.response.data.error));
      } else if (error.request) {
        dispatch(updateUserFail(null, 'No response from server'));
      } else {
        dispatch(updateUserFail(null, error.message));
      }
    });
};
