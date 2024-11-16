import { join } from 'path';
import { getHash } from '../hash';
import { extractTranslations, populateTranslationsFile } from '../update-translations';

const main = async () => {
  const translations = await extractTranslations(
    join(__dirname, '4-hash-key-function-translations-app.tsx'),
    /translate\(\s*'([^']*)',/g,
    (translations, translatableText) => {
      translations[getHash(translatableText)] = translatableText;
    },
  );

  await populateTranslationsFile(translations, join(__dirname, '4-resources.json'), [
    'eng',
    'fra',
    'spa',
  ]);
};

main();
