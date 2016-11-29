import PubSub from 'pubsub-js';

import WebSocketService from '../../common/services/web-socket';

import Topics from './topics';

const Actions = {
  OK: 'OK',
  ERROR: 'ERROR',
  COMPILATION_RESULTS: 'COMPILATION_RESULTS',
  GET_CODE: 'GET_CODE',
  PUT_CODE: 'PUT_CODE'
};

const createServerCommunicator = function createServerCommunicator(webSocketService) {
  let isInitialized = false;

  const onErrorListener = function errorListener() {
    PubSub.publish(Topics.COMMUNICATION_ERROR, '');
  };

  const bindListeners = function bindListeners() {
    webSocketService.bindAction(Actions.COMPILATION_RESULTS, function resultListener(data) {
      PubSub.publish(Topics.COMPILATION_RESULTS, data.arguments);
    });

    webSocketService.bindAction(Actions.OK, function resultListener(data) {
      PubSub.publish(Topics.SERVER_OK, data.arguments);
    });

    webSocketService.bindAction(Actions.ERROR, function resultListener(data) {
      PubSub.publish(Topics.SERVER_ERROR, data.arguments);
    });

    webSocketService.addEventListener('error', onErrorListener);
  };

  const unbindListeners = function unbindListeners() {
    webSocketService.unbindAction(Actions.COMPILATION_RESULTS);

    webSocketService.unbindAction(Actions.OK);

    webSocketService.unbindAction(Actions.ERROR);

    webSocketService.removeEventListener('error', onErrorListener);
  };

  const initialize = function initialize() {
    if (isInitialized) {
      return true;
    }

    if (!WebSocketService.isOpen()) {
      return false;
    }

    bindListeners();

    return true;
  };

  const destroy = function destroy() {
    if (!isInitialized) {
      return;
    }

    unbindListeners();

    isInitialized = false;
  };

  const sendCode = function sendCode(source) {
    webSocketService.send(Actions.PUT_CODE, { source });
  };

  const getCode = function getCode() {
    webSocketService.send(Actions.GET_CODE, {});
  };

  return {
    initialize,
    destroy,
    sendCode,
    getCode
  };
};

const ServerCommunicator = createServerCommunicator(WebSocketService);

ServerCommunicator.create = createServerCommunicator;

export default ServerCommunicator;
