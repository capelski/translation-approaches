import React, { createContext, useContext, useState } from 'react';
import { InterpolateParameters } from '../interpolate/interpolate-app';
import { LanguageSelector } from '../language-selector';
import { parseHtml } from '../translate-component/parse-html';
import { translate } from '../translate-component/translate-component-app';

export const LanguageContext = createContext<string>('');

export interface TranslateProps {
  children: string;
  parameters?: InterpolateParameters;
}

const Translate: React.FC<TranslateProps> = (props) => {
  const language = useContext(LanguageContext);

  return translate(parseHtml(props.children), language, props.parameters);
};

export const TranslateProviderApp: React.FC = () => {
  const [name, setName] = useState('World');
  const [language, setLanguage] = useState('eng');

  return (
    <LanguageContext.Provider value={language}>
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
          <Translate parameters={{ name }}>Hello [[name]]</Translate>
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
          <button
            onClick={() => {
              alert(translate("Hi! This is [[name]]'s laptop", language, { name }));
            }}
          >
            <Translate>Greet</Translate>
          </button>
        </p>
        <p>
          <Translate>Language selector</Translate>:
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </p>
      </div>
    </LanguageContext.Provider>
  );
};
