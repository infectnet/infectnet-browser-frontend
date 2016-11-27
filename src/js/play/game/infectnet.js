import { Game, AUTO } from 'phaser';

const createInfectNet = function createInfectNet() {
  let isGameRunning = false;

  let game = null;

  const initGame = function initGame(containerElement) {
    game = new Game(640, 480, AUTO, containerElement);
  };

  return {
    play(containerElement) {
      if (!isGameRunning) {
        isGameRunning = true;

        initGame(containerElement);
      }
    },
    resize(height, width) {

    },
    isRunning() {
      return isGameRunning;
    }
  };
};

const InfectNet = createInfectNet();

export default InfectNet;
