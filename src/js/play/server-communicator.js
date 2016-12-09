import PubSub from 'pubsub-js';

import WebSocketService from '../common/services/web-socket';

import Topics from './topics';

const Actions = {
  OK: 'OK',
  ERROR: 'ERROR',
  COMPILATION_RESULTS: 'COMPILATION_RESULTS',
  GET_CODE: 'GET_CODE',
  PUT_CODE: 'PUT_CODE',
  SUBSCRIBE: 'SUBSCRIBE',
  STATUS_UPDATE: 'STATUS_UPDATE'
};

const createServerCommunicator = function createServerCommunicator(webSocketService) {
  let isInitialized = false;

  const latestStatus = {
    tiles: [],
    entities: []
  };

  const processStatusUpdate = function processStatusUpdate(statusMessage)  {
    latestStatus.tiles = [];
    latestStatus.entities = [];

    statusMessage.tileSet.forEach(function processTile(tile) {
      latestStatus.tiles.push(tile);

      if (tile.entity) {
        latestStatus.entities.push(tile.entity);
      }
    });
  };

  const publishStatusUpdate = function publishStatusUpdate(statusMessage) {
    processStatusUpdate(statusMessage);

    PubSub.publish(Topics.STATUS_UPDATE, latestStatus);
  };

  const onErrorListener = function errorListener() {
    PubSub.publish(Topics.COMMUNICATION_ERROR, '');
  };

  const bindListeners = function bindListeners() {
    webSocketService.bindAction(Actions.COMPILATION_RESULTS, function resultListener(data) {
      const results = {};

      results.errors = data.arguments.errors.map(function convertError(error) {
        return {
          message: error.message,
          line: error.lineNumber,
          column: error.columnNumber
        };
      });

      PubSub.publish(Topics.COMPILATION_RESULTS, results);
    });

    webSocketService.bindAction(Actions.OK, function resultListener(data) {
      PubSub.publish(Topics.SERVER_OK, data.arguments);

      if (Object.prototype.hasOwnProperty.call(data.arguments, 'source')) {
        PubSub.publish(Topics.CODE_RETRIEVED, data.arguments.source);
      }
    });

    webSocketService.bindAction(Actions.ERROR, function resultListener(data) {
      PubSub.publish(Topics.SERVER_ERROR, data.arguments);
    });

    webSocketService.bindAction(Actions.STATUS_UPDATE, function resultListener(data) {
      publishStatusUpdate(data.arguments);
    });

    webSocketService.addEventListener('error', onErrorListener);
  };

  const unbindListeners = function unbindListeners() {
    webSocketService.unbindAction(Actions.COMPILATION_RESULTS);

    webSocketService.unbindAction(Actions.OK);

    webSocketService.unbindAction(Actions.ERROR);

    webSocketService.unbindAction(Actions.STATUS_UPDATE);

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

  const subscribe = function subscribe() {
    webSocketService.send(Actions.SUBSCRIBE, {});
  };

  const getLatestStatus = function getLatestStatus() {
    return latestStatus;
  };

  return {
    initialize,
    destroy,
    sendCode,
    getCode,
    subscribe,
    getLatestStatus
  };
};

const ServerCommunicator = createServerCommunicator(WebSocketService);

ServerCommunicator.create = createServerCommunicator;

export default ServerCommunicator;
