import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

const initInternationalization = function initInternationalization(callback) {
  i18next
    .use(XHR)
    .init({
      debug: true,
      lng: 'en',
      fallbackLng: 'en',
      ns: [
        'home',
        'common'
      ],
      defaultNS: 'common',
      backend: {
        loadPath: 'locales/{{lng}}/{{ns}}.json'
      }
    }, callback);
};

export { i18next as i18n, initInternationalization };
