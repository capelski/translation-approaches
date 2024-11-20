import React from 'react';
import { createRoot } from 'react-dom/client';
import { InterpolateApp } from './interpolate/interpolate-app';
import { ReactI18nextApp } from './react-i18next/react-i18next-app';
import { TranslateComponentApp } from './translate-component/translate-component-app';
import { ExplicitKeysApp } from './translate-function/alternatives/explicit-keys/explicit-keys-app';
import { HashKeysApp } from './translate-function/alternatives/hash-keys/hash-keys-app';
import { TranslateFunctionApp } from './translate-function/translate-function-app';
import { TranslateProviderApp } from './translate-provider/translate-provider-app';
import { UntranslatedApp } from './untranslated/untranslated-app';

const container = document.getElementById('app-placeholder')!;
const root = createRoot(container);

const AppWrapper: React.FC = () => {
  return <ReactI18nextApp />;

  return <TranslateProviderApp />;

  return <TranslateComponentApp />;

  return <InterpolateApp />;

  return <TranslateFunctionApp />;
  /** Equivalent alternatives */
  return <ExplicitKeysApp />;
  return <HashKeysApp />;

  return <UntranslatedApp />;
};

root.render(<AppWrapper />);
