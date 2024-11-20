import React, { useState } from 'react';
import { LanguageSelector } from '../../../language-selector';
import resources from './resources.json';

export enum TranslationKeys {
  body = 'body',
  greet = 'greet',
  greeting_1 = 'greeting_1',
  greeting_2 = 'greeting_2',
  hello = 'hello',
  language_selector = 'language_selector',
}

const translate = (text: TranslationKeys, language: string) => {
  const translations = resources[language as keyof typeof resources];
  const translatedText = translations?.[text as unknown as keyof typeof translations];
  return translatedText || text;
};

export const ExplicitKeysApp: React.FC = () => {
  const [name, setName] = useState('World');
  const [language, setLanguage] = useState('eng');

  return (
    <div>
      <p>
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
        />
      </p>
      <h1>
        {translate(TranslationKeys.hello, language)} {name}
      </h1>
      <p>{translate(TranslationKeys.body, language)}</p>
      <p>
        <button
          onClick={() => {
            alert(
              `${translate(TranslationKeys.greeting_1, language)}${name}${translate(
                TranslationKeys.greeting_2,
                language,
              )}`,
            );
          }}
        >
          {translate(TranslationKeys.greet, language)}
        </button>
      </p>
      <p>
        {translate(TranslationKeys.language_selector, language)}:
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </p>
    </div>
  );
};
