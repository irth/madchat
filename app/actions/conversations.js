import uniqueId from 'lodash.uniqueid';

import axios from 'axios';
import { API_URL } from '../config';

import { authFail } from './auth';

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAIL = 'FETCH_MESSAGES_FAIL';

export const fetchMessagesRequest = friend => ({
  type: FETCH_MESSAGES_REQUEST,
  friend,
});

export const fetchMessagesSuccess = (friend, messages) => ({
  type: FETCH_MESSAGES_SUCCESS,
  friend,
  messages,
});

export const fetchMessagesFail = friend => ({
  type: FETCH_MESSAGES_FAIL,
  friend,
});

export const fetchMessages = (authToken, friend, count = 10, before) => (dispatch) => {
  dispatch(fetchMessagesRequest(friend));
  let url = `${API_URL}/history?auth_token=${authToken}&friend=${friend}&count=${count}`;
  if (before != null) url += `&before=${before}`;

  axios.get(url).then(r => dispatch(fetchMessagesSuccess(friend, r.data.messages))).catch((e) => {
    if (e.response && e.response.status === 401) dispatch(authFail('Unauthorized.'));
    else dispatch(fetchMessagesFail(friend));
  });
};

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';

export const sendMessageRequest = (friend, id, message) => ({
  type: SEND_MESSAGE_REQUEST,
  friend,
  id,
  message,
});

export const sendMessageSuccess = (friend, id) => ({
  type: SEND_MESSAGE_SUCCESS,
  friend,
  id,
});

export const sendMessageFail = (friend, id) => ({
  type: SEND_MESSAGE_FAIL,
  friend,
  id,
});

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const addMessage = (friend, message) => ({
  type: ADD_MESSAGE,
  friend,
  message,
});

export const sendMessage = (authToken, friend, message) => (dispatch) => {
  const localId = uniqueId();
  dispatch(sendMessageRequest(friend, localId, message));
  axios
    .post(`${API_URL}/send`, { auth_token: authToken, target: friend, message })
    .then((r) => {
      dispatch(sendMessageSuccess(friend, localId));
      dispatch(addMessage(friend, r.data));
    })
    .catch((e) => {
      if (e.response && e.response.status === 401) dispatch(authFail('Unauthorized.'));
      else dispatch(sendMessageFail(friend, localId));
    });
};

export const SET_INPUT = 'SET_INPUT';
