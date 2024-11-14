import i18next from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next, Trans, useTranslation } from 'react-i18next';
import { LanguageSelector } from '../language-selector';
import { resources } from './6-resources';

/** Transforms { language: { key: text} } into { language: { translation: { key: text} } } */
function nestProperties<T extends Object>(target: T) {
  return Object.keys(target).reduce((reduced, languageCode) => {
    return { ...reduced, [languageCode]: { translation: { ...target[languageCode as keyof T] } } };
  }, {});
}

i18next.use(initReactI18next).init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'eng',
  resources: nestProperties(resources),
});

export const ReactI18nextApp: React.FC = () => {
  const [] = useTranslation(); // Necessary to re-render the component on language change

  return (
    <I18nextProvider i18n={i18next}>
      <div>
        <h1>
          <Trans>Hello World</Trans>
        </h1>
        <p>
          <Trans>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
            McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
            the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
            the cites of the word in classical literature, discovered the undoubtable source. Lorem
            Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
            Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the
            theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
            "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </Trans>
        </p>
        <p>
          <Trans>Language selector</Trans>
          <LanguageSelector
            language={i18next.language}
            setLanguage={(nextLanguage) => i18next.changeLanguage(nextLanguage)}
          />
        </p>
      </div>
    </I18nextProvider>
  );
};
