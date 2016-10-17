import m from 'mithril';
import Velocity from 'velocity';

const Animation = {};

Animation.fadesIn = function fadesIn(callback, element) {
  const e = element;

  e.style = element.style || {};

  e.style.opacity = 0;

  e.classList.remove('is-hidden');

  m.redraw.strategy('none');

  Velocity(e, { opacity: 1 }, {
    complete() {
      m.startComputation();

      if (callback) {
        callback();
      }

      m.endComputation();
    }
  });
};

Animation.fadesOut = function fadesOut(callback, element) {
  m.redraw.strategy('none');

  Velocity(element, { opacity: 0 }, {
    display: 'none',
    complete() {
      m.startComputation();

      if (callback) {
        callback();
      }

      m.endComputation();
    }
  });
};

Animation.fromEvent = function fromEvent(animFunc, callback) {
  return function wrapper(e) {
    animFunc(callback, e.target);
  };
};

export default Animation;
