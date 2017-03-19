import { readFileSync } from 'fs';
import { join } from 'path';

import { ServerConfig } from '../../type/server-config';

const getScriptUrl = (): string => {
  const revJson = JSON.parse(readFileSync('rev.json', { encoding: 'utf-8' }));
  return revJson.scriptUrl;
};

const create = (): ServerConfig => {
  const imageBaseUrl = process.env.IMAGE_BASE_URL;
  const port = parseInt((process.env.PORT || '4000'), 10);
  const publicDir = join(process.cwd(), 'public');
  const scriptUrl = (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/scripts/index.js' : getScriptUrl());
  const styleUrl = '/index.css';
  return {
    imageBaseUrl,
    port,
    publicDir,
    scriptUrl,
    styleUrl
  };
};

export { create };
