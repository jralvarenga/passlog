import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { NativeModules } from 'react-native'
import EN_TRANSLATION from './l10n/en'
//import TranslationES from './languages/es'

const detectSelectedDeviceLan = () => {
  const locale = NativeModules.I18nManager.localeIdentifier
  const language = locale.split('_')[0]
  switch (language) {
    case 'en':
      return 'en'
    case 'es':
      return 'es'
    default:
      return 'en'
  }
}

const resources = {
  en: {
    translation: EN_TRANSLATION
  },
  /*es: {
    translation: TranslationES
  }*/
}

i18n.use(initReactI18next).init({
  resources,
  lng: detectSelectedDeviceLan(),
  interpolation: {
    escapeValue: false
  }
})

export default i18n