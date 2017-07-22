import { addMessage } from '../actions/conversations';

export default (socket, store) => {
  // TODO: on connected
  // TODO: on connectionError
  // TODO: on inputBufferUpdate
  socket.on('message', data => store.dispatch(addMessage(data.sender, data)));

  store.subscribe(() => {
    const newToken = store.getState().auth.token;
    if (socket.authToken !== newToken) {
      socket.disconnect();
      socket.setAuthToken(newToken);
      socket.connect();
    }
  });

  socket.setAuthToken(store.getState().auth.token);
  socket.connect();
};
