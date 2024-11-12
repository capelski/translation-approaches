import React from 'react';
import { createRoot } from 'react-dom/client';
import { OriginalApp } from './1-original-app';

const container = document.getElementById('app-placeholder')!;
const root = createRoot(container);

root.render(<OriginalApp defaultLanguage="eng" />);
