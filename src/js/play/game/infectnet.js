import { Game, AUTO } from 'phaser';

import Boot from './states/boot';
import Preload from './states/preload';
import GameState from './states/game-state';

const createInfectNet = function createInfectNet() {
  let isGameRunning = false;

  let game = null;

  const initGame = function initGame(containerElement, rect, preStartCallback) {
    game = new Game(rect.width, rect.height, AUTO, containerElement);

    game.state.add('Boot', Boot);
    game.state.add('Preload', Preload);
    game.state.add('GameState', GameState);

    GameState.setPreStartCallback(preStartCallback);

    game.state.start('Boot');
  };

  return {
    play(containerElement, rect) {
      if (!isGameRunning) {
        isGameRunning = true;

        initGame(containerElement, rect);
      }
    },
    isRunning() {
      return isGameRunning;
    }
  };
};

const InfectNet = createInfectNet();

export default InfectNet;
