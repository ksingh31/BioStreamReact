import React from 'react';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

// Import all locales
import en from '../../locales/en.json'
import de from '../../locales/de.json';
import { observer } from 'mobx-react';
import AppController from './AppController';

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  i18n.locale = locales[0].languageTag;
}

i18n.fallbacks = true;
i18n.translations = {
  en,
  de
};

function App() {
  return (
    <AppController />
  );
}

export default observer(App);