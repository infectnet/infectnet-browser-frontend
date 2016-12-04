import { Game, AUTO } from 'phaser';

import Boot from './states/boot';
import Preload from './states/preload';
import GameState from './states/game-state';

const createInfectNet = function createInfectNet() {
  const ZOOM_DELTA = 0.02;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 1.0;

  let currentZoomFactor = 1.0;

  let isGameRunning = false;

  let game = null;

  let currentStatus = {};

  const initGame = function initGame(containerElement, rect, preStartCallback) {
    game = new Game(rect.width, rect.height, AUTO, containerElement);

    game.state.add('Boot', Boot);
    game.state.add('Preload', Preload);
    game.state.add('GameState', GameState);

    GameState.setPreStartCallback(preStartCallback);

    game.state.start('Boot');
  };

  // eslint-disable-next-line no-unused-vars
  const preprocessStatus = function preprocessStatus(status) {
    /*
     * Map tile and entity types to tileset indices.
     */

    return null;
  };

  const modifyZoom = function modifyZoom(delta) {
    currentZoomFactor += delta;

    GameState.zoomTo(currentZoomFactor);
  };

  // eslint-disable-next-line no-unused-vars
  const findClosestBaseTo = function findClosestBaseTo(x, y) {
    return { x: 0, y: 0 };
  };

  return {
    play(containerElement, rect) {
      if (!isGameRunning) {
        isGameRunning = true;

        initGame(containerElement, rect);
      }
    },
    isRunning() {
      return isGameRunning;
    },
    update(status) {
      if (status) {
        currentStatus = status;

        const tileData = preprocessStatus(currentStatus);

        GameState.prepareUpdate(tileData);
      }
    },
    increaseZoom() {
      if (currentZoomFactor < MAX_ZOOM) {
        modifyZoom(ZOOM_DELTA);
      }
    },
    decreaseZoom() {
      if (currentZoomFactor > MIN_ZOOM) {
        modifyZoom(-ZOOM_DELTA);
      }
    },
    getCurrentStatus() {
      return currentStatus;
    },
    jumpToClosestBase() {
      const basePosition = findClosestBaseTo(game.camera.x, game.camera.y);

      GameState.jumpTo(basePosition);
    }
  };
};

const InfectNet = createInfectNet();

export default InfectNet;
