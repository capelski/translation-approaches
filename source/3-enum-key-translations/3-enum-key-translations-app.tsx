import React from 'react';
import { AppProps } from '../app-props';
import { LanguageSelector } from '../language-selector';
import sources from './3-sources.json';
import { TranslationKeys } from './3-translations-enum';

const translate = (text: TranslationKeys, language: string) => {
  const translations = sources[language as keyof typeof sources];
  const translatedText = translations?.[text as keyof typeof translations];
  return translatedText || text;
};

export const EnumKeyTranslationsApp: React.FC<AppProps> = (props: AppProps) => {
  return (
    <div>
      <h1>{translate(TranslationKeys.app_header, props.language)}</h1>
      <p>{translate(TranslationKeys.app_body, props.language)}</p>
      <p>
        {translate(TranslationKeys.language_selector, props.language)}:
        <LanguageSelector {...props} />
      </p>
    </div>
  );
};
