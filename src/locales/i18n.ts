import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "#/locales/en/translation.json";
import ptBR from "#/locales/pt-BR/translation.json";

const resources = {
  en: {
    translation: en,
  },
  "pt-BR": {
    translation: ptBR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt-BR",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
