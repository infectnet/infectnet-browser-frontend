import { Plugin } from 'phaser';
import 'phaser-kinetic-scrolling-plugin';

const TILE_SIZE = 32;

const MAP_SIZE = 1000;

const GROUND_LAYER = 'ground';

const OBJECT_LAYER = 'object';

const GameState = {};

GameState.currentTileData = {
  ground: [],
  objects: []
};

GameState.nextTileData = null;

GameState.init = function init() {
  this.game.kineticScrolling = this.game.plugins.add(Plugin.KineticScrolling);

  this.game.kineticScrolling.configure({
    horizontalScroll: true,
    verticalScroll: true
  });
};

GameState.create = function create() {
  this.game.kineticScrolling.start();

  const tilemap = this.game.add.tilemap();

  tilemap.addTilesetImage('tileset', null, TILE_SIZE, TILE_SIZE, 0, 0, 0);

  const ground = tilemap.create(GROUND_LAYER, MAP_SIZE, MAP_SIZE, TILE_SIZE, TILE_SIZE);

  tilemap.create(OBJECT_LAYER, MAP_SIZE, MAP_SIZE, TILE_SIZE, TILE_SIZE);

  ground.resizeWorld();

  GameState.tilemap = tilemap;

  if (GameState.preStartCallback) {
    GameState.preStartCallback();
  }
};

GameState.update = function update() {
  if (GameState.nextTileData) {
    GameState.updateTiles();
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

export default GameState;
