import { promises } from 'fs';
import { join } from 'path';
import { getHash } from '../hash';

type LanguageTranslations = { [key: string]: string };
const supportedAdditionalLanguages = ['fra', 'spa'];

const extractTranslations = async () => {
  const fileContent = await promises.readFile(
    join(__dirname, '4-hash-key-function-translations-app.tsx'),
  );
  const text = fileContent.toString();
  const translationCallRegExp = /translate\(\s*'([^']*)',/g;

  let translatableText: string | undefined;
  let translations: LanguageTranslations = {};
  while (!!(translatableText = translationCallRegExp.exec(text)?.[1])) {
    translations[getHash(translatableText)] = translatableText;
  }

  return translations;
};

const populateTranslationsFile = async (translations: LanguageTranslations) => {
  const jsonFilePath = join(__dirname, '4-sources.json');
  const fileExists = await promises.stat(jsonFilePath).catch(() => false);
  const existingTranslations = fileExists ? require(jsonFilePath) : {};
  existingTranslations.eng = translations;

  supportedAdditionalLanguages.forEach((languageCode) => {
    existingTranslations[languageCode] = Object.keys(translations).reduce((reduced, key) => {
      return {
        ...reduced,
        [key]: existingTranslations[languageCode]?.[key] ?? '',
      };
    }, {});
  });

  await promises.writeFile(jsonFilePath, JSON.stringify(existingTranslations, undefined, 2));
};

const main = async () => {
  const translations = await extractTranslations();
  await populateTranslationsFile(translations);
};

main();
