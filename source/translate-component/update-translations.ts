import { join } from 'path';
import { defaultTranslationRegExps, updateTranslations } from '../update-translations';
import { parseHtml } from './parse-html';

updateTranslations(
  [join(__dirname, 'translate-component-app.tsx')],
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
