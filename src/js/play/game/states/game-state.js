import { Tile } from 'phaser';

import ZoomCamera from '../zoom-camera.js';

const TILE_SIZE = 32;

const MAP_SIZE = 1000;

const GROUND_LAYER = 'ground';

const OBJECT_LAYER = 'object';

const GameState = {};

GameState.layers = {
  ground: null,
  object: null
};

GameState.currentTileData = {
  ground: [],
  objects: []
};

GameState.nextTileData = null;

GameState.oldCameraPosition = null;

GameState.init = function init() {
  this.game.zoomCamera = new ZoomCamera(this.game, this.world);
};

GameState.create = function create() {
  const tilemap = this.game.add.tilemap();

  tilemap.addTilesetImage('tileset', null, TILE_SIZE, TILE_SIZE, 0, 0, 0);

  GameState.layers.ground =
    tilemap.create(GROUND_LAYER, MAP_SIZE, MAP_SIZE, TILE_SIZE, TILE_SIZE);

  GameState.layers.object =
    tilemap.createBlankLayer(OBJECT_LAYER, MAP_SIZE, MAP_SIZE, TILE_SIZE, TILE_SIZE);

  GameState.layers.ground.resizeWorld();

  this.game.zoomCamera.add(GameState.layers.ground);

  this.game.zoomCamera.add(GameState.layers.object);

  GameState.tilemap = tilemap;

  GameState.monkeyPatch(tilemap);

  if (GameState.preStartCallback) {
    GameState.preStartCallback();
  }
};

GameState.monkeyPatch = function monkeyPatch(tilemap) {
  tilemap.removeTile = function(x, y, layer) {
    layer = ((layer === GROUND_LAYER) ? 0 : 1);

    this.layers[layer].data[y][x].index = -1;

    /*this.layers[layer].data[y][x] =
      new Tile(this.layers[layer], -1, x, y, this.tileWidth, this.tileHeight);*/
  };

  tilemap.putTile = function putTile(tile, x, y, layer) {
    layer = ((layer === GROUND_LAYER) ? 0 : 1);

    if (this.hasTile(x, y, layer)) {
      this.layers[layer].data[y][x].index = tile;
    } else {
      this.layers[layer].data[y][x] =
        new Tile(this.layers[layer], tile, x, y, this.tileWidth, this.tileHeight);
    }
  };
};

GameState.update = function update() {
  if (GameState.nextTileData) {
    GameState.updateTiles();
  }

  GameState.updateCameraPosition();
};

GameState.updateCameraPosition = function updateCameraPosition() {
  if (this.game.input.activePointer.isDown && !this.game.input.pointer2.isDown) {
    if (GameState.oldCameraPosition) {
      this.game.camera.x +=
        GameState.oldCameraPosition.x - this.game.input.activePointer.position.x;
      this.game.camera.y +=
        GameState.oldCameraPosition.y - this.game.input.activePointer.position.y;
    }

    GameState.oldCameraPosition = this.game.input.activePointer.position.clone();
  } else {
    GameState.oldCameraPosition = null;
  }
};

GameState.prepareUpdate = function prepareUpdate(tileData) {
  GameState.nextTileData = tileData;
};

GameState.render = function render() {
  this.game.debug.cameraInfo(this.game.camera, 32, 32);
};

GameState.updateTiles = function updateTiles() {
  /*
     * Remove the tiles from the last tick
   */

  for (let i = 0; i < GameState.currentTileData.ground.length; ++i) {
    GameState.tilemap.removeTile(GameState.currentTileData.ground[i].x, GameState.currentTileData.ground[i].y, GROUND_LAYER);
  }

  /*GameState.currentTileData.ground.forEach(function groundRemover(groundTile) {
    GameState.tilemap.removeTile(groundTile.x, groundTile.y, GROUND_LAYER);
  })

  GameState.currentTileData.objects.forEach(function objectRemover(objectTile) {
    GameState.tilemap.removeTile(objectTile.x, objectTile.y, OBJECT_LAYER);
  });*/

  /*
   * Add the new tiles to the tilemap
   */
  /*GameState.nextTileData.ground.forEach(function groundAdder(groundTile) {
    GameState.tilemap.putTile(groundTile.index, groundTile.x, groundTile.y, GROUND_LAYER);
  });

  GameState.nextTileData.ground.forEach(function objectAdder(objectTile) {
    GameState.tilemap.putTile(objectTile.index, objectTile.x, objectTile.y, OBJECT_LAYER);
  });*/

  for (let i = 0; i < GameState.nextTileData.ground.length; ++i) {
    GameState.tilemap.putTile(GameState.nextTileData.ground[i].index, GameState.nextTileData.ground[i].x, GameState.nextTileData.ground[i].y, GROUND_LAYER);
  }

  GameState.tilemap.putTile(0, 0, 0, GROUND_LAYER);
  GameState.tilemap.layers[0].dirty = true;
  GameState.tilemap.layers[1].dirty = true;

  GameState.tilemap.calculateFaces(0);
  GameState.tilemap.calculateFaces(1);

  GameState.currentTileData = GameState.nextTileData;

  GameState.nextTileData = null;
};

GameState.setPreStartCallback = function setPreStartCallback(callback) {
  GameState.preStartCallback = callback;
};

GameState.zoomTo = function zoomTo(scale) {
  this.game.zoomCamera.zoomTo(scale);

  GameState.layers.ground.resizeWorld();

  this.game.camera.bounds = this.game.world.bounds;
};

GameState.jumpTo = function jumpTo(position) {
  this.game.camera.setPosition(position.x, position.y);
};

export default GameState;
