import { API_URL } from '../config';

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
