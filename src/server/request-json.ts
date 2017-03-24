import { fetch } from './globals';
import { url } from '../common/util/url';

const requestJson = (path: string): Promise<string> => {
  return fetch(url(path)).then((response) => response.text());
};

export { requestJson };
