const Boot = {
  preload() {
    /*
     * Load loading screen resources here.
     */
  },
  create() {
    /*
     * Initialize Game settings here.
     */

    /*
     * Proceed to the preload phase where all resources will be loaded.
     */
    this.state.start('Preload');
  }
};

export default Boot;
