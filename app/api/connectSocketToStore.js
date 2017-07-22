import { addMessage } from '../actions/conversations';

export default (socket, state) => {
  // TODO: on connected
  // TODO: on connectionError
  // TODO: on inputBufferUpdate
  socket.on('message', data => state.dispatch(addMessage(data.sender, data)));
};
