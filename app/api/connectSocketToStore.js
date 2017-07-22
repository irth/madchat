import { addMessage, setInput } from '../actions/conversations';
import { connectionRequest, connectionSuccess, connectionFail } from '../actions/connection';

export default (socket, store) => {
  socket.on('connected', () => store.dispatch(connectionSuccess()));
  socket.on('connectionError', () => store.dispatch(connectionFail()));
  // TODO: on statusUpdate
  socket.on('inputBufferUpdate', data => store.dispatch(setInput(data.id, data.value)));
  socket.on('message', data => store.dispatch(addMessage(data.sender, data, true)));

  store.subscribe(() => {
    const newToken = store.getState().auth.token;
    if (socket.authToken !== newToken) {
      socket.disconnect();
      socket.setAuthToken(newToken);
      store.dispatch(connectionRequest());
      socket.connect();
    }
  });

  socket.setAuthToken(store.getState().auth.token);
  store.dispatch(connectionRequest());
  socket.connect();
};
