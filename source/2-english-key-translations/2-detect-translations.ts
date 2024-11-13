import { join } from 'path';
import { extractTranslations, populateTranslationsFile } from '../detect-translations';

const main = async () => {
  const translations = await extractTranslations(
    join(__dirname, '2-english-key-translations-app.tsx'),
    /translate\(\s*'([^']*)',/g,
    (translations, translatableText) => {
      translations[translatableText] = translatableText;
    },
  );

  await populateTranslationsFile(translations, join(__dirname, '2-sources.json'), ['fra', 'spa']);
};

main();
