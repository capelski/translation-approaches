import React from 'react';
import { AppProps } from '../app-props';
import { LanguageSelector } from '../language-selector';
import resources from './2-resources.json';

const translate = (text: string, language: string) => {
  const translations = resources[language as keyof typeof resources];
  const translatedText = translations?.[text as keyof typeof translations];
  return translatedText || text;
};

export const EnglishKeyTranslationsApp: React.FC<AppProps> = (props: AppProps) => {
  return (
    <div>
      <h1>{translate('Hello World', props.language)}</h1>
      <p>
        {translate(
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
          props.language,
        )}
      </p>
      <p>
        {translate('Language selector', props.language)}:
        <LanguageSelector {...props} />
      </p>
    </div>
  );
};
