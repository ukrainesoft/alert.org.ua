import messagesUk from "./uk/messages.json";
import messagesEn from "./en/messages.json";
import regionsUk from "./uk/regions.json";
import regionsEn from "./en/regions.json";
import { createI18n } from "vue-i18n";

const messages = {
  en: {
    message: messagesEn,
    region: regionsEn,
  },
  uk: {
    message: messagesUk,
    region: regionsUk,
  },
};

function getLang() {
  // return "uk";
  if (navigator.languages != undefined) return navigator.languages[0];
  return navigator.language;
}

export const i18n = createI18n({
  legacy: false,
  locale: getLang(),
  fallbackLocale: "en",
  messages,
});
