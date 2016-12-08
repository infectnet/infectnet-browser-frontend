import { Game, AUTO } from 'phaser';

import Boot from './states/boot';
import Preload from './states/preload';
import { GameState, TILE_SIZE } from './states/game-state';

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

  const mapEntityNameToIndex = function mapEntityNameToIndex(typeName) {
    return {
      Nest: 2
    }[typeName];
  };

  const preprocessStatus = function preprocessStatus(status) {
    const processedStatus = {
      ground: [],
      objects: []
    };

    if (status.tileSet) {
      status.tileSet.forEach(function tileProcessor(tile) {
        const groundTile = {
          x: tile.position.w,
          y: tile.position.h
        };

        groundTile.index = mapTileTypeToIndex(tile.type);

        processedStatus.ground.push(groundTile);

        if (tile.entity) {
          const objectTile = Object.assign({}, groundTile);

          objectTile.index = mapEntityNameToIndex(tile.entity.typeComponent.name);

          processedStatus.objects.push(objectTile);
        }
      });
    }

    return processedStatus;
  };

  const modifyZoom = function modifyZoom(delta) {
    currentZoomFactor += delta;

    GameState.zoomTo(currentZoomFactor);
  };

  const findClosestBaseTo = function findClosestBaseTo(x, y) {
    const bases = [];

    currentStatus.tileSet.forEach(function getBase(tile) {
      if (tile.entity) {
        if (tile.entity.typeComponent.name === 'Nest') {
          bases.push({
            x: tile.position.w,
            y: tile.position.h,
            distance: distance2(tile.position.w * TILE_SIZE, tile.position.h * TILE_SIZE)
          });
        }
      }
    });

    bases.sort((a, b) => a.distance - b.distance);

    if (bases.length === 0) {
      return { x: 0, y: 0 };
    }

    return { x: bases[0].x, y: bases[0].y };

    function distance2(tileX, tileY) {
      return ((tileX - x) * (tileX - x)) + ((tileY - y) * (tileY - y));
    }
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
