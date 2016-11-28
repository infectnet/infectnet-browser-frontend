import m from 'mithril';

const mx = {};

// Calls attrs.elementProp with the real DOM element when created
mx.getElement = function getElement(selector, attrs, children) {
  const newAttrs = Object.assign({}, attrs);

  // Won't get passed to Mithril
  delete newAttrs.elementProp;

  const elementProp = attrs.elementProp;

  newAttrs.config = function newConfig(element, isInit, context) {
    if (attrs.config) {
      attrs.config(element, isInit, context);
    }

    if (elementProp) {
      elementProp(element);
    }
  };

  return m(selector, newAttrs, children);
};

mx.bindOnce = (function bindOnce() {
  const cache = {};

  return function boundView(view) {
    if (!cache[view.toString()]) {
      cache[view.toString()] = true;

      return view();
    }

    return { subtree: 'retain' };
  };
}());

mx.icon = function icon(iconName, attrs) {
  return m('span.icon', m(`i.fa.${iconName}`, attrs));
};

export default mx;
