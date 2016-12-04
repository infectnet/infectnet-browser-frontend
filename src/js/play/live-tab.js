import m from 'mithril';

const LiveTab = {};

LiveTab.controller = function controller(args) {
  return {
    tabHeight: args.tabHeight
  };
};

LiveTab.view = function view(ctrl) {
  return m('.container.is-marginless.is-fluid', {
    style: { height: `${ctrl.tabHeight()}px` }
  }, [
    m('.section', { style: { height: '100%' } })
  ]);
};

export default LiveTab;
