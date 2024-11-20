import { join } from 'path';
import { parseHtml } from '../translate-component/parse-html';
import { defaultTranslationRegExps, updateTranslations } from '../update-translations';

updateTranslations(
  [join(__dirname, 'translate-provider-app.tsx')],
  join(__dirname, 'resources.json'),
  ['eng', 'fra', 'spa'],
  {
    addTranslation: (translations, translatableText) => {
      const parsedText = parseHtml(translatableText);
      translations[parsedText] = parsedText;
    },
    translationRegExps: [...defaultTranslationRegExps, /<Translate[^>]*>([^<]*)<\/Translate>/gm],
  },
);
