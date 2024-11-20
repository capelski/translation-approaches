import { join } from 'path';
import { getHash } from '../../../hash';
import { updateTranslations } from '../../../update-translations';

updateTranslations(
  [join(__dirname, 'hash-keys-app.tsx')],
  join(__dirname, 'resources.json'),
  ['eng', 'fra', 'spa'],
  {
    addTranslation: (translations, translatableText) => {
      translations[getHash(translatableText)] = translatableText;
    },
  },
);
