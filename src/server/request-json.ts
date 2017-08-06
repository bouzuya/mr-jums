import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'url';
import { ServerConfig } from '../common/type/server-config';
import { fetch } from './globals';

const requestJson = (path: string, { jsonBaseUrl }: ServerConfig): Promise<string> => {
  if (jsonBaseUrl.startsWith('file:')) {
    const fileUri = join(jsonBaseUrl, path);
    const filePath = parse(fileUri).path;
    if (typeof filePath === 'undefined') {
      throw new Error(`invalid file uri: '${fileUri}'`);
    }
    return Promise.resolve(readFileSync(filePath, 'utf-8'));
  } else {
    return fetch(jsonBaseUrl + path).then((response) => response.text());
  }
};

export { requestJson };
