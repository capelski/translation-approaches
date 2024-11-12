import React, { useState } from 'react';
import { AppProps } from '../app-props';
import sources from './3-sources.json';
import { TranslationKeys } from './3-translations-enum';

const translate = (text: TranslationKeys, language: string) => {
  const translations = sources[language as 'fra' | 'spa'];
  const translatedText = (translations as any)?.[text];
  return translatedText || text;
};

export const EnumKeyTranslationsApp: React.FC<AppProps> = (props: AppProps) => {
  const [language, setLanguage] = useState(props.defaultLanguage);

  return (
    <div>
      <h1>{translate(TranslationKeys.app_header, language)}</h1>
      <p>{translate(TranslationKeys.app_body, language)}</p>
      <p>
        {translate(TranslationKeys.language_selector, language)}:
        <select
          onChange={(event) => {
            setLanguage(event.target.value);
          }}
          value={language}
        >
          <option value="eng">English</option>
          <option value="fra">French</option>
          <option value="spa">Spanish</option>
        </select>
      </p>
    </div>
  );
};
