import React from 'react';
import { AppProps } from './app-props';

export const LanguageSelector: React.FC<AppProps> = (props: AppProps) => {
  return (
    <select
      onChange={(event) => {
        props.setLanguage(event.target.value);
      }}
      value={props.language}
    >
      <option value="eng">English</option>
      <option value="fra">French</option>
      <option value="spa">Spanish</option>
    </select>
  );
};
