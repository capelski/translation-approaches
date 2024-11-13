import { join } from 'path';
import { extractTranslations, populateTranslationsFile } from '../detect-translations';
import { getHash } from '../hash';
import { parseMultilineHtml } from './5-multiline-html';

const main = async () => {
  const translations = await extractTranslations(
    join(__dirname, '5-hash-key-component-translations-app.tsx'),
    /<Translate>([^<]*)<\/Translate>/gm,
    (translations, translatableText) => {
      const trimmedText = parseMultilineHtml(translatableText);
      translations[getHash(trimmedText)] = trimmedText;
    },
  );

  await populateTranslationsFile(translations, join(__dirname, '5-resources.json'), [
    'eng',
    'fra',
    'spa',
  ]);
};

main();
