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

GameState.render = function render() {
  this.game.debug.cameraInfo(this.game.camera, 32, 32);
};

GameState.create = function create() {
  const tilemap = this.game.add.tilemap();

  tilemap.addTilesetImage('tileset', null, TILE_SIZE, TILE_SIZE, 0, 0, 0);

  GameState.layers.ground = tilemap.create(GROUND_LAYER, MAP_SIZE, MAP_SIZE, TILE_SIZE, TILE_SIZE);

  GameState.layers.object = tilemap.create(OBJECT_LAYER, MAP_SIZE, MAP_SIZE, TILE_SIZE, TILE_SIZE);

  tilemap.putTile(1, 0, 0, GameState.layers.ground);
  tilemap.putTile(1, 0, 1, GameState.layers.ground);
  tilemap.putTile(1, 1, 0, GameState.layers.ground);
  tilemap.putTile(1, 1, 1, GameState.layers.ground);

  GameState.layers.ground.resizeWorld();

  this.game.zoomCamera.add(GameState.layers.ground);

  this.game.zoomCamera.add(GameState.layers.object);

  GameState.tilemap = tilemap;

  if (GameState.preStartCallback) {
    GameState.preStartCallback();
  }
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
  GameState.currentTileData.ground.forEach(function groundRemover(groundTile) {
    GameState.tilemap.removeTile(groundTile.x, groundTile.y, GROUND_LAYER);
  });

  GameState.currentTileData.objects.forEach(function objectRemover(objectTile) {
    GameState.tilemap.removeTile(objectTile.x, objectTile.y, OBJECT_LAYER);
  });

  /*
   * Add the new tiles to the tilemap
   */
  GameState.nextTileData.ground.forEach(function groundAdder(groundTile) {
    GameState.tilemap.putTile(groundTile.index, groundTile.x, groundTile.y, GROUND_LAYER);
  });

  GameState.nextTileData.ground.forEach(function objectAdder(objectTile) {
    GameState.tilemap.putTile(objectTile.index, objectTile.x, objectTile.y, OBJECT_LAYER);
  });

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
