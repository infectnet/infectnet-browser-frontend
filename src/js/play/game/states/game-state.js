import { Tile } from 'phaser';

import ZoomCamera from '../zoom-camera.js';

const TILE_SIZE = 32;

const MAP_SIZE = 1000;

const GROUND_LAYER = 'ground';

const OBJECTS_LAYER = 'objectS';

const GameState = {};

GameState.layers = {
  ground: null,
  objects: null
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

  GameState.layers.objects =
    tilemap.createBlankLayer(OBJECTS_LAYER, MAP_SIZE, MAP_SIZE, TILE_SIZE, TILE_SIZE);

  GameState.layers.ground.resizeWorld();

  this.game.zoomCamera.add(GameState.layers.ground);

  this.game.zoomCamera.add(GameState.layers.objects);

  GameState.tilemap = tilemap;

  GameState.monkeyPatchTilemap(tilemap);

  if (GameState.preStartCallback) {
    GameState.preStartCallback();
  }
};

/*
 * The performane of Phaser's native putTile/removeTile methods was unacceptable for us
 * so a few changes had to be made.
 *
 * New, unsafe implementations were added to the tilemap instance. These function does not
 * perform the safety checks by the original methods and omit calling Tilemap.calculateFaces().
 * That method must be called manually.
 *
 * We could remove the calculateFaces() method call because it will produce the same results if we
 * call it after all putTile/removeTile operations have finished.
 */
GameState.monkeyPatchTilemap = function monkeyPatchTilemap(tilemap) {
  /*
   * Assignment must be done here to patch the original tilemap.
   * Although we could set it to a local variable, that does not make any sense.
   */
  // eslint-disable-next-line no-param-reassign
  tilemap.removeTile = function removeTile(x, y, layer) {
    const layerIndex = ((layer === GROUND_LAYER) ? 0 : 1);

    this.layers[layerIndex].data[y][x].index = -1;
  };

  // eslint-disable-next-line no-param-reassign
  tilemap.putTile = function putTile(tile, x, y, layer) {
    const layerIndex = ((layer === GROUND_LAYER) ? 0 : 1);

    if (this.hasTile(x, y, layer)) {
      this.layers[layerIndex].data[y][x].index = tile;
    } else {
      this.layers[layerIndex].data[y][x] =
        new Tile(this.layers[layerIndex], tile, x, y, this.tileWidth, this.tileHeight);
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

GameState.updateTiles = function updateTiles() {
  /*
     * Remove the tiles from the last tick
   */
  for (let i = 0; i < GameState.currentTileData.ground.length; i += 1) {
    GameState.tilemap.removeTile(GameState.currentTileData.ground[i].x,
                                 GameState.currentTileData.ground[i].y,
                                 GROUND_LAYER);
  }

  for (let i = 0; i < GameState.currentTileData.objects.length; i += 1) {
    GameState.tilemap.removeTile(GameState.currentTileData.objects[i].x,
                                 GameState.currentTileData.objects[i].y,
                                 OBJECTS_LAYER);
  }

  /*
   * Add the new tiles to the tilemap
   */
  for (let i = 0; i < GameState.nextTileData.ground.length; i += 1) {
    GameState.tilemap.putTile(GameState.nextTileData.ground[i].index,
                              GameState.nextTileData.ground[i].x,
                              GameState.nextTileData.ground[i].y,
                              GROUND_LAYER);
  }

  for (let i = 0; i < GameState.nextTileData.objects.length; i += 1) {
    GameState.tilemap.putTile(GameState.nextTileData.objects[i].index,
                              GameState.nextTileData.objects[i].x,
                              GameState.nextTileData.objects[i].y,
                              OBJECTS_LAYER);
  }

  /*
   * Set layers as dirty to force them to be rendered and execute
   * the calculateFaces method after the batched tile operations.
   */
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
  this.game.camera.focusOnXY(position.x * TILE_SIZE, position.y * TILE_SIZE);
};

export { GameState, MAP_SIZE, TILE_SIZE };
