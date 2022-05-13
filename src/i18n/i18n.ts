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

function getDefaultLang() {
  const lang =
    navigator.languages != undefined
      ? navigator.languages[0]
      : navigator.language;
  if (lang === "ru") {
    return "uk";
  }
  return lang;
}

function customRule(choice: number, choicesLength: number, orgRule: number) {
  if (choice === 0) {
    return 0;
  }

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;
  if (!teen && endsWithOne) {
    return 1;
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2;
  }

  return choicesLength < 4 ? 2 : 3;
}

export const i18n = createI18n({
  legacy: false,
  locale: getDefaultLang(),
  fallbackLocale: "en",
  pluralRules: {
    uk: customRule,
  },
  messages,
});
