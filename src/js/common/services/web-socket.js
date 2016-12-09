import ServerIp from './server-ip';

const ofAddress = function ofAddress(address, options) {
  return fromProvider(() => address, options);
};

const fromProvider = function fromProvider(addressProvider, options = { useWss: false }) {
  const WS_PATH = 'ws';

  let actionListeners;

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

    actionListeners = {};

    socket.onmessage = dispatcher;
  };

  const dispatcher = function dispatcher(evt) {
    const message = JSON.parse(evt.data);

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

  const addEventListener = function addEventListener(...args) {
    socket.addEventListener(...args);
  };

  const removeEventListener = function removeEventListener(...args) {
    socket.removeEventListener(...args);
  };

  const bindAction = function bindAction(action, listener) {
    actionListeners[action] = listener;
  };

  const unbindAction = function unbindAction(action) {
    delete actionListeners[action];
  };

  const isOpen = function isOpen() {
    if (socket && socket.readyState) {
      return socket.readyState === 1;
    }

    return false;
  };

  return {
    connect,
    getRawSocket,
    send,
    addEventListener,
    removeEventListener,
    bindAction,
    unbindAction,
    isOpen
  };
};

const WebSocketService = fromProvider(ServerIp.retrieve);

WebSocketService.ofAddress = ofAddress;
WebSocketService.fromProvider = fromProvider;

export default WebSocketService;
