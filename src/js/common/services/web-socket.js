import ServerIp from './server-ip';

const ofAddress = function ofAddress(address, options) {
  return fromProvider(() => address, options);
};

const fromProvider = function fromProvider(addressProvider, options = { useWss: false }) {
  const WS_PATH = 'ws';

  const socketListeners = {};

  const actionListeners = {};

  let socket;

  const getAddress = function getAddress() {
    let address = addressProvider();

    if (!address.startsWith('ws://') && !address.startsWith('wss://')) {
      address = `${options.useWss ? 'wss' : 'ws'}://${address}`;
    }

    return `${address}/${WS_PATH}`;
  };

  const connect = function connect() {
    socket = new WebSocket(getAddress());

    // eslint-disable-next-line no-restricted-syntax
    for (const evt in socketListeners) {
      if (Object.prototype.hasOwnProperty.call(socketListeners, evt)) {
        socket[evt] = socketListeners[evt];
      }
    }

    socket.onmessage = dispatcher;
  };

  const dispatcher = function dispatcher(evt) {
    const message = evt.data;

    if (Object.prototype.hasOwnProperty.call(actionListeners, message.action)) {
      actionListeners[message.action](message);
    }
  };

  const getRawSocket = function getRawSocket() {
    return socket;
  };

  const send = function send(action, args) {
    const message = { action, arguments: args };

    socket.send(JSON.stringify(message));
  };

  const onclose = function onclose(listener) {
    socketListeners.onclose = listener;
  };

  const onopen = function onopen(listener) {
    socketListeners.onopen = listener;
  };

  const onerror = function onerror(listener) {
    socketListeners.onerror = listener;
  };

  const bindAction = function bindAction(action, listener) {
    actionListeners[action] = listener;
  };

  const unbindAction = function unbindAction(action) {
    delete actionListeners[action];
  };

  return {
    connect,
    getRawSocket,
    send,
    onclose,
    onopen,
    onerror,
    bindAction,
    unbindAction
  };
};

const WebSocketService = fromProvider(ServerIp.retrieve);

WebSocketService.ofAddress = ofAddress;
WebSocketService.fromProvider = fromProvider;

export default WebSocketService;
