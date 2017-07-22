import { WS_URL } from '../config';

export default class SocketConnection {
  constructor(authToken) {
    this.sock = null;
    this.authToken = authToken;
    this.eventHandlers = {
      connected: [],
      connectionError: [],
      inputBufferUpdate: [],
      statusUpdate: [],
      message: [],
    };
  }

  on(ev, handler) {
    if (this.eventHandlers[ev] != null) {
      this.eventHandlers[ev].push(handler);
      return () => {
        const h = this.eventHandlers[ev];
        const i = h.indexOf(handler);
        if (i > -1) h.splice(i, 1);
      };
    }
    return null;
  }

  callHandlers(ev, ...args) {
    if (this.eventHandlers[ev] != null) {
      this.eventHandlers[ev].forEach(handler => handler(...args));
    }
  }

  connect() {
    this.sock = new WebSocket(`${WS_URL}?auth_token=${this.authToken}`);
    const s = this.sock;
    s.onmessage = this.onSocketMessage.bind(this);
    s.onopen = this.onSocketOpen.bind(this);
    s.onerror = this.onSocketError.bind(this);
  }

  onSocketOpen() {
    this.callHandlers('connected');
  }

  onSocketError(e) {
    this.callHandlers('connectionError', e);
  }

  onSocketMessage(event) {
    const data = JSON.parse(event.data);
    console.log(data);
    this.callHandlers(data.type, data);
  }

  setInput(id, value) {
    this.sock.send(JSON.stringify({ id, value }));
  }
}
