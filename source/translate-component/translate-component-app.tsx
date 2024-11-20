import React, { useState } from 'react';
import { InterpolateParameters, interpolateValues } from '../interpolate/interpolate-app';
import { LanguageSelector } from '../language-selector';
import { parseHtml } from './parse-html';
import resources from './resources.json';

export const translate = (
  text: string,
  language: string,
  parameters: InterpolateParameters = {},
): string => {
  const translations = resources[language as keyof typeof resources];
  const translatedText = translations?.[text as keyof typeof translations] as string;
  return interpolateValues(translatedText || text, parameters);
};

export interface TranslateProps {
  language: string;
  children: string;
  parameters?: InterpolateParameters;
}

const Translate: React.FC<TranslateProps> = (props) => {
  return translate(parseHtml(props.children), props.language, props.parameters);
};

export const TranslateComponentApp: React.FC = () => {
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
        <Translate language={language} parameters={{ name }}>
          Hello [[name]]
        </Translate>
      </h1>
      <p>
        <Translate language={language}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
          of classical Latin literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the
          more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the
          cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
          of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
          ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
          dolor sit amet..", comes from a line in section 1.10.32.
        </Translate>
      </p>
      <p>
        <button
          onClick={() => {
            alert(translate("Hi! This is [[name]]'s laptop", language, { name }));
          }}
        >
          <Translate language={language}>Greet</Translate>
        </button>
      </p>
      <p>
        <Translate language={language}>Language selector</Translate>:
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </p>
    </div>
  );
};
