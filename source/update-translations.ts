import { promises } from 'fs';

type LanguageTranslations = { [key: string]: string };

const defaultAddTranslation = (translations: LanguageTranslations, translatableText: string) => {
  translations[translatableText] = translatableText;
};

const defaultGetNewEntryValue = (
  language: string,
  key: string,
  translations: LanguageTranslations,
) => {
  return language === 'eng' ? translations[key] : '';
};

export const defaultTranslationRegExps = [/translate\(\s*'([^']*)',/g, /translate\(\s*"([^"]*)",/g];

type UpdateTranslationsOptions = {
  addTranslation?: typeof defaultAddTranslation;
  getNewEntryValue?: typeof defaultGetNewEntryValue;
  translationRegExps?: RegExp[];
};

const extractTranslations = async (
  codeFilePaths: string[],
  translationRegExps = defaultTranslationRegExps,
  addTranslation = defaultAddTranslation,
): Promise<LanguageTranslations> => {
  let translations: LanguageTranslations = {};
  let translatableText: string | undefined;

  for (const filePath of codeFilePaths) {
    const text = await getCodeText(filePath);

    for (const regExp of translationRegExps) {
      while (!!(translatableText = regExp.exec(text)?.[1])) {
        addTranslation(translations, translatableText);
      }
    }
  }
  return translations;
};

const getExistingTranslations = async (jsonFilePath: string) => {
  const fileExists = await promises.stat(jsonFilePath).catch(() => false);
  const existingTranslations = fileExists ? require(jsonFilePath) : {};
  return existingTranslations;
};

const getCodeText = async (codeFilePath: string) => {
  const fileContent = await promises.readFile(codeFilePath);
  const text = fileContent.toString();
  return text;
};

const populateTranslationsFile = async (
  translations: LanguageTranslations,
  jsonFilePath: string,
  languages: string[],
  getNewEntryValue = defaultGetNewEntryValue,
) => {
  const existingTranslations = await getExistingTranslations(jsonFilePath);

  for (const language of languages) {
    existingTranslations[language] = Object.keys(translations).reduce((reduced, key) => {
      return {
        ...reduced,
        [key]:
          existingTranslations[language]?.[key] ?? getNewEntryValue(language, key, translations),
      };
    }, {});
  }

  await promises.writeFile(jsonFilePath, JSON.stringify(existingTranslations, undefined, 2));
};

export const updateTranslations = async (
  codeFilePaths: string[],
  jsonFilePath: string,
  languages: string[],
  options: UpdateTranslationsOptions = {},
) => {
  const addTranslation = options.addTranslation ?? defaultAddTranslation;
  const getNewEntryValue = options.getNewEntryValue ?? defaultGetNewEntryValue;
  const translationRegExps = options.translationRegExps ?? defaultTranslationRegExps;

  const translations = await extractTranslations(codeFilePaths, translationRegExps, addTranslation);
  await populateTranslationsFile(translations, jsonFilePath, languages, getNewEntryValue);
};
