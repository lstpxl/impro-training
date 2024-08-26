import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/i18n/translations/en.json";
import ru from "@/i18n/translations/ru.json";

export const languageList = [
  { code: "en", name: "English" },
  { code: "ru", name: "Russian" },
];

// import { readFileSync } from "fs";
// const en2 = JSON.parse(readFileSync("./i18n/translations/en.json", "utf-8"));

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: en,
  ru: ru,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    lng: "ru", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
