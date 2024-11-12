import React, { useState } from 'react';
import { AppProps } from '../app-props';
import sources from './2-sources.json';

const translate = (text: string, language: string) => {
  const translations = sources[language as 'fra' | 'spa'];
  const translatedText = (translations as any)?.[text];
  return translatedText || text;
};

export const EnglishKeyTranslationsApp: React.FC<AppProps> = (props: AppProps) => {
  const [language, setLanguage] = useState(props.defaultLanguage);

  return (
    <div>
      <h1>{translate('Hello World', language)}</h1>
      <p>
        {translate(
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
          language,
        )}
      </p>
      <p>
        {translate('Language selector', language)}:
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
