const Preload = {
  preload() {
    this.game.load.image('tileset', 'assets/game/tileset.png');
  },
  create() {
    /*
     * Start the actual game state.
     */
    this.state.start('GameState');
  }
};

export default Preload;
