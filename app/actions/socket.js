export const CONNECT_REQUEST = 'CONNECT_REQUEST';
export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const CONNECT_FAIL = 'CONNECT_FAIL';

export const SET_RETRY_TIME = 'SET_RETRY_TIME';

export const setRetryTime = time => ({
  type: SET_RETRY_TIME,
  time,
});
