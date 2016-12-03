import { Plugin } from 'phaser';
import 'phaser-kinetic-scrolling-plugin';

const TILE_SIZE = 32;

const GameState = {};

GameState.init = function init() {
  this.game.kineticScrolling = this.game.plugins.add(Plugin.KineticScrolling);

  this.game.kineticScrolling.configure({
    horizontalScroll: true,
    verticalScroll: true
  });
};

GameState.create = function create() {
  this.game.kineticScrolling.start();

  /*
   * Create a new blank tilemap with 32x32 tiles and 1000x1000 size
   */
  const tilemap = this.game.add.tilemap();

  tilemap.addTilesetImage('tileset', null, TILE_SIZE, TILE_SIZE, 0, 0, 0);

  const layer = tilemap.create('layer', 1000, 1000, TILE_SIZE, TILE_SIZE);

  layer.resizeWorld();

  tilemap.putTile(0, 0, 0, 'layer');
  tilemap.putTile(1, 1, 1, 'layer');

  if (GameState.preStartCallback) {
    GameState.preStartCallback();
  }
};

GameState.setPreStartCallback = function setPreStartCallback(callback) {
  GameState.preStartCallback = callback;
};

export default GameState;
