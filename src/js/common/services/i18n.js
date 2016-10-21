import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

const createI18nService = function createI18nService(storage) {
  const STORAGE_KEY = 'current_language';
  const DEFAULT_LANG = 'en';

  if (storage.getItem(STORAGE_KEY) === null) {
    storage.setItem(STORAGE_KEY, DEFAULT_LANG);
  }

  const getCurrentLanguage = function getCurrentLanguage() {
    return storage.getItem(STORAGE_KEY);
  };

  const setCurrentLanguage = function setCurrentLanguage(lang, callback) {
    storage.setItem(STORAGE_KEY, lang);

    i18next.changeLanguage(lang, callback);
  };

  return {
    getCurrentLanguage,
    setCurrentLanguage
  };
};

const init = function init(service, callback) {
  i18next
    .use(XHR)
    .init({
      debug: true,
      lng: service.getCurrentLanguage(),
      fallbackLng: 'en',
      ns: [
        'common',
        'site',
        'server',
        'admin'
      ],
      defaultNS: 'common',
      backend: {
        loadPath: 'locales/{{lng}}/{{ns}}.json'
      }
    }, callback);
};

const I18nService = createI18nService(localStorage);

I18nService.create = createI18nService;

const boundInit = init.bind(null, I18nService);

export { i18next as i18n, boundInit as initInternationalization, I18nService };
