import { join } from 'path';
import { updateTranslations } from '../../../update-translations';

updateTranslations(
  [join(__dirname, 'explicit-keys-app.tsx')],
  join(__dirname, 'resources.json'),
  ['eng', 'fra', 'spa'],
  {
    getNewEntryValue: () => '',
    translationRegExps: [/translate\(\s*TranslationKeys.([^,]*),/g],
  },
);
