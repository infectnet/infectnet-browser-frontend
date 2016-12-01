const Preload = {
  preload() {
    /*
     * Load all resources here. Also add a loading bar or something like that.
     */
  },
  create() {
    /*
     * Start the actual game state.
     */
    this.state.start('GameState');
  }
};

export default Preload;
