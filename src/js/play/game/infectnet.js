import { Game, AUTO } from 'phaser';

import Boot from './states/boot';
import Preload from './states/preload';
import GameState from './states/game-state';

const createInfectNet = function createInfectNet() {
  let isGameRunning = false;

  let game = null;

  const initGame = function initGame(containerElement) {
    game = new Game(640, 480, AUTO, containerElement);

    game.state.add('Boot', Boot);
    game.state.add('Preload', Preload);
    game.state.add('GameState', GameState);

    game.state.start('Boot');
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
