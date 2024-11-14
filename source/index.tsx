import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { OriginalApp } from './1-original-app/1-original-app';
import { EnglishKeyTranslationsApp } from './2-english-key-translations/2-english-key-translations-app';
import { EnumKeyTranslationsApp } from './3-enum-key-translations/3-enum-key-translations-app';
import { HashKeyFunctionTranslationsApp } from './4-hash-key-function-translations/4-hash-key-function-translations-app';
import { HashKeyComponentTranslationsApp } from './5-hash-key-component-translations/5-hash-key-component-translations-app';
import { ReactI18nextApp } from './6-react-i18next/6-react-i18next-app';

const container = document.getElementById('app-placeholder')!;
const root = createRoot(container);

const AppWrapper: React.FC = () => {
  const [language, setLanguage] = useState('eng');

  return <ReactI18nextApp />;

  return <HashKeyComponentTranslationsApp language={language} setLanguage={setLanguage} />;

  return <HashKeyFunctionTranslationsApp language={language} setLanguage={setLanguage} />;

  return <EnumKeyTranslationsApp language={language} setLanguage={setLanguage} />;

  return <EnglishKeyTranslationsApp language={language} setLanguage={setLanguage} />;

  return <OriginalApp language={language} setLanguage={setLanguage} />;
};

root.render(<AppWrapper />);
