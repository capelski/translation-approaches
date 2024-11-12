import React from 'react';
import { createRoot } from 'react-dom/client';
import { EnumKeyTranslationsApp } from './3-enum-key-translations/3-enum-key-translations-app';

const container = document.getElementById('app-placeholder')!;
const root = createRoot(container);

// root.render(<OriginalApp defaultLanguage="eng" />);
root.render(<EnumKeyTranslationsApp defaultLanguage="eng" />);
