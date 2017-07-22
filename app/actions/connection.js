export const CONNECTION_REQUEST = 'CONNECTION_REQUEST';
export const CONNECTION_SUCCESS = 'CONNECTION_SUCCESS';
export const CONNECTION_FAIL = 'CONNECTION_FAIL';

export const connectionRequest = () => ({
  type: CONNECTION_REQUEST,
});

export const connectionSuccess = () => ({
  type: CONNECTION_SUCCESS,
});

export const connectionFail = () => ({
  type: CONNECTION_FAIL,
});
