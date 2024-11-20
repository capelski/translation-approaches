import { join } from 'path';
import { updateTranslations } from '../update-translations';

updateTranslations(
  [join(__dirname, 'translate-function-app.tsx')],
  join(__dirname, 'resources.json'),
  ['eng', 'fra', 'spa'],
);
