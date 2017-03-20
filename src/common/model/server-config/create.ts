import { readFileSync } from 'fs';
import { join } from 'path';

import { ServerConfig } from '../../type/server-config';

const getUrls = (): { scriptUrl: string; styleUrl: string; } => {
  const revJson = JSON.parse(readFileSync('rev.json', { encoding: 'utf-8' }));
  return revJson;
};

const create = (): ServerConfig => {
  const imageBaseUrl = process.env.IMAGE_BASE_URL;
  const port = parseInt((process.env.PORT || '4000'), 10);
  const publicDir = join(process.cwd(), 'public');
  const urls = getUrls();
  const scriptUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/scripts/index.js' : urls.scriptUrl;
  const styleUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/styles/index.css' : urls.styleUrl;
  return {
    imageBaseUrl,
    port,
    publicDir,
    scriptUrl,
    styleUrl
  };
};

export { create };
