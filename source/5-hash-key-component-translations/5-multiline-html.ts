export const parseMultilineHtml = (text: string) =>
  text
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
