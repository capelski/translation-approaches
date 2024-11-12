import React from 'react';
import { createRoot } from 'react-dom/client';
import { OriginalApp } from './original-app';

const container = document.getElementById('app-placeholder')!;
const root = createRoot(container);

// 1. Original App
root.render(<OriginalApp defaultLanguage="eng" />);
