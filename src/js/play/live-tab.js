import m from 'mithril';
import PubSub from 'pubsub-js';

import { i18n } from '../common/services/i18n';

import Topics from './topics';

const LiveTab = {};

const MAX_MESSAGE_COUNT = 50;

LiveTab.vm = {
  init() {
    LiveTab.vm.messages = m.prop([]);
  }
};

LiveTab.controller = function controller(args) {
  LiveTab.vm.init();

  const addMessage = function addNewMessage(message) {
    if (LiveTab.vm.messages().length > MAX_MESSAGE_COUNT) {
      LiveTab.vm.messages().pop();
    }

    LiveTab.vm.messages().unshift(message);
  };

  const mapUpdateToMessage = function mapUpdateToMessage(msg, statusUpdate) {
    const message = {
      date: new Date(),
      tileCount: statusUpdate.tiles.length,
      entityCount: statusUpdate.entities.length
    };

    addMessage(message);
  };

  PubSub.subscribe(Topics.STATUS_UPDATE, mapUpdateToMessage);

  return {
    tabHeight: args.tabHeight
  };
};

LiveTab.view = function view(ctrl) {
  return m('.container.is-marginless.is-fluid', {
    style: { height: `${ctrl.tabHeight()}px` }
  }, [
    m('.section.status-section', LiveTab.vm.messages().map(mapMessagesToBoxes))
  ]);

  function mapMessagesToBoxes(message) {
    const content = `<strong>${i18n.t('play:Updates.Received')}</strong>
                     <small>${message.date.toISOString()}<small>
                     <br>
                     <ul>
                      <li>${i18n.t('play:Updates.Entities')}: ${message.entityCount}</li>
                      <li>${i18n.t('play:Updates.Tiles')}: ${message.tileCount}</li>
                     </ul>`;

    return m('.box.status-box',
      m('.media',
        m('.media-content',
          m('.content',
            m('p',
              m.trust(content))))));
  }
};

export default LiveTab;
