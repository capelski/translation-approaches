import { promises } from 'fs';

type LanguageTranslations = { [key: string]: string };

export const extractTranslations = async (
  codeFilePath: string,
  translationRegexp: RegExp,
  processTranslation: (translations: LanguageTranslations, translatableText: string) => void,
): Promise<LanguageTranslations> => {
  const fileContent = await promises.readFile(codeFilePath);
  const text = fileContent.toString();

  let translatableText: string | undefined;
  let translations: LanguageTranslations = {};
  while (!!(translatableText = translationRegexp.exec(text)?.[1])) {
    processTranslation(translations, translatableText);
  }

  return translations;
};

export const populateTranslationsFile = async (
  translations: LanguageTranslations,
  jsonFilePath: string,
  languages: string[],
  extractEnglish = true,
) => {
  const fileExists = await promises.stat(jsonFilePath).catch(() => false);
  const existingTranslations = fileExists ? require(jsonFilePath) : {};

  languages.forEach((languageCode) => {
    existingTranslations[languageCode] = Object.keys(translations).reduce((reduced, key) => {
      return {
        ...reduced,
        [key]:
          existingTranslations[languageCode]?.[key] ??
          (languageCode === 'eng' && extractEnglish ? translations[key] : ''),
      };
    }, {});
  });

  await promises.writeFile(jsonFilePath, JSON.stringify(existingTranslations, undefined, 2));
};
