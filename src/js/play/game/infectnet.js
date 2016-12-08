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

  const mapTileTypeToIndex = function mapTileTypeToIndex(type) {
    return {
      CAVE: 0,
      ROCK: 1
    }[type];
  };

  const preprocessStatus = function preprocessStatus(status) {
    const processedStatus = {
      ground: [],
      objects: []
    };

    if (status.tileSet) {
      for (let i = 0; i < status.tileSet.length; ++i) {
        const groundTile = {
          x: status.tileSet[i].position.w,
          y: status.tileSet[i].position.h
        };

        groundTile.index = mapTileTypeToIndex(status.tileSet[i].type);

        processedStatus.ground.push(groundTile);
      }
      /*status.tileSet.forEach(function tileProcessor(tile) {
        const groundTile = {
          x: tile.position.w,
          y: tile.position.h
        };

        groundTile.index = mapTileTypeToIndex(tile.type);

        processedStatus.ground.push(groundTile);
      });*/
    }

    return processedStatus;
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
    play(containerElement, rect, preStartCallback) {
      if (!isGameRunning) {
        isGameRunning = true;

        initGame(containerElement, rect, preStartCallback);
      }
    },
    isRunning() {
      return isGameRunning;
    },
    update(status) {
      if (status) {
        currentStatus = status;

        const tileData = preprocessStatus(currentStatus);

        console.log(tileData);

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
