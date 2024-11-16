import { join } from 'path';
import { extractTranslations, populateTranslationsFile } from '../update-translations';

const main = async () => {
  const translations = await extractTranslations(
    join(__dirname, '3-enum-key-translations-app.tsx'),
    /translate\(\s*TranslationKeys.([^,]*),/g,
    (translations, translatableText) => {
      translations[translatableText] = translatableText;
    },
  );

  await populateTranslationsFile(
    translations,
    join(__dirname, '3-resources.json'),
    ['eng', 'fra', 'spa'],
    false,
  );
};

main();
