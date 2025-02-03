import translations from "./translations.json";

export const getTranslation = (key, lang) => {
  const keys = key.split(".");
  let value = translations;

  for (const k of keys) {
    value = value[k];
    if (!value) return key; // Return key as fallback if not found
  }

  return value[lang] || value["en"]; // Default to English if translation is missing
};
