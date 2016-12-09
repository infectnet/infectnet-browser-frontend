const Cond = function Cond(condition, defaultTrue, defaultFalse) {
  return {
    cond(ifTrue, ifFalse) {
      return condition ? ifTrue : ifFalse;
    },
    ifFalse(value) {
      return condition ? (defaultTrue || '') : value;
    },
    ifTrue(value) {
      return condition ? value : (defaultFalse || '');
    },
    exec(ifTrue, ifFalse) {
      if (condition) {
        ifTrue();
      } else {
        ifFalse();
      }
    },
    get() {
      return condition;
    }
  };
};

export default Cond;
