import React, { useState } from 'react';
import { getHash } from '../../../hash';
import { LanguageSelector } from '../../../language-selector';
import resources from './resources.json';

const translate = (text: string, language: string) => {
  const translations = resources[language as keyof typeof resources];
  const translatedText = translations?.[getHash(text) as keyof typeof translations];
  return translatedText || text;
};

export const HashKeysApp: React.FC = () => {
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
        {translate('Hello', language)} {name}
      </h1>
      <p>
        {translate(
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
          language,
        )}
      </p>
      <p>
        <button
          onClick={() => {
            alert(
              `${translate('Hi! This is ', language)}${name}${translate("'s laptop", language)}`,
            );
          }}
        >
          {translate('Greet', language)}
        </button>
      </p>
      <p>
        {translate('Language selector', language)}:
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </p>
    </div>
  );
};
