import React, { useContext } from 'react';
import { AppProps } from '../app-props';
import { getHash } from '../hash';
import { LanguageSelector } from '../language-selector';
import { LanguageContext } from './5-context';
import { parseMultilineHtml } from './5-multiline-html';
import resources from './5-resources.json';

export interface TranslateProps {
  children: string;
}

const Translate: React.FC<TranslateProps> = (props: TranslateProps) => {
  const language = useContext(LanguageContext);

  const translations = resources[language as keyof typeof resources];
  const hash = getHash(parseMultilineHtml(props.children));
  const translatedText = translations?.[hash as keyof typeof translations];
  return translatedText || props.children;
};

export const HashKeyComponentTranslationsApp: React.FC<AppProps> = (props: AppProps) => {
  return (
    <LanguageContext.Provider value={props.language}>
      <div>
        <h1>
          <Translate>Hello World</Translate>
        </h1>
        <p>
          <Translate>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
            McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
            the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
            the cites of the word in classical literature, discovered the undoubtable source. Lorem
            Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
            Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the
            theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
            "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </Translate>
        </p>
        <p>
          <Translate>Language selector</Translate>
          <LanguageSelector {...props} />
        </p>
      </div>
    </LanguageContext.Provider>
  );
};
