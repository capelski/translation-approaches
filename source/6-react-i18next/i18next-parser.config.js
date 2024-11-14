module.exports = {
  createOldCatalogs: false,
  defaultValue: (locale, _namespace, key) => {
    return locale === 'eng' ? key : '';
  },
  /** An array of globs that describe where to look for source files
   * relative to the location of the configuration file */
  input: ['./6-react-i18next-app.tsx'],
  keySeparator: false,
  locales: ['eng', 'fra', 'spa'],
  namespaceSeparator: false,
  /** Supports $LOCALE and $NAMESPACE injection.
   * Supports JSON (.json) and YAML (.yml) file formats.
   * Where to write the locale files relative to process.cwd() */
  output: './source/6-react-i18next/6-resources/$LOCALE.json',
  pluralSeparator: false,
  sort: true,
  verbose: false,
};

// See https://github.com/i18next/i18next-parser?tab=readme-ov-file#options
