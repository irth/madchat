import { API_URL } from '../config';

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
