import axios from 'axios';

import { API_URL } from '../config';
import { authFail } from '../actions/auth';

export const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST';
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const FETCH_FRIENDS_FAIL = 'FETCH_FRIENDS_FAIL';

export const fetchFriendsRequest = () => ({
  type: FETCH_FRIENDS_REQUEST,
});

export const fetchFriendsSuccess = friends => ({
  type: FETCH_FRIENDS_SUCCESS,
  friends,
});

export const fetchFriendsFail = () => ({
  type: FETCH_FRIENDS_FAIL,
});

export const fetchFriends = () => (dispatch, getState) => {
  const authToken = getState().auth.token;
  dispatch(fetchFriendsRequest());
  axios
    .get(`${API_URL}/friends?auth_token=${authToken}`)
    .then(r => dispatch(fetchFriendsSuccess(r.data.friends)))
    .catch((error) => {
      if (error.response && error.response.status === 401) dispatch(authFail('Unauthorized.'));
      else dispatch(fetchFriendsFail());
    });
};

export const UPDATE_STATUS = 'UPDATE_STATUS';

export const updateStatus = (friend, status) => ({
  type: UPDATE_STATUS,
  friend,
  status,
});
