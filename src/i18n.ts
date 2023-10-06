import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cn from './libs/locales/cn.json';
import en from './libs/locales/en.json';
import ja from './libs/locales/ja.json';
import ko from './libs/locales/ko.json';

const resources = {
  en: {
    translation: en,
  },
  cn: {
    translation: cn,
  },
  ko: {
    translation: ko,
  },
  ja: {
    translation: ja,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('locale') || 'cn',
  fallbackLng: 'en',
});

export default i18n;
