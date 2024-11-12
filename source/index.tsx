import React from 'react';
import { createRoot } from 'react-dom/client';
import { EnglishKeyTranslationsApp } from './2-english-key-translations/2-english-key-translations-app';

const container = document.getElementById('app-placeholder')!;
const root = createRoot(container);

// root.render(<OriginalApp defaultLanguage="eng" />);
root.render(<EnglishKeyTranslationsApp defaultLanguage="eng" />);
