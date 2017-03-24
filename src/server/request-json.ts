import { fetch } from './globals';

const requestJson = (path: string): Promise<string> => {
  const url = `https://blog.bouzuya.net${path}`;
  return fetch(url).then((response) => response.text());
};

export { requestJson };
