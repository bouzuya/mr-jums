import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';

import { ServerConfig } from '../../type/server-config';

const getRevJsonPath = (): string | null => {
  const f = (d: string): string | null => {
    if (existsSync(join(d, 'package.json'))) return d;
    const p = dirname(d);
    return p === d ? null : f(p);
  };
  const p = f(__dirname);
  return p === null ? null : join(p, 'rev.json');
};

const getUrls = (): { scriptUrl: string; styleUrl: string; } => {
  const revJsonPath = getRevJsonPath();
  if (revJsonPath === null) throw new Error('rev.json not found');
  const revJson = JSON.parse(readFileSync(revJsonPath, { encoding: 'utf-8' }));
  return revJson;
};

const create = (options?: Partial<{ imageBaseUrl: string; jsonBaseUrl: string; }>): ServerConfig => {
  const imageBaseUrlOrUndefined = process.env.IMAGE_BASE_URL;
  const imageBaseUrl = typeof options === 'undefined'
    ? imageBaseUrlOrUndefined
    : typeof options.imageBaseUrl === 'undefined'
      ? imageBaseUrlOrUndefined
      : options.imageBaseUrl;
  if (typeof imageBaseUrl === 'undefined')
    throw new Error('imageBaseUrl is not defined');
  const jsonBaseUrlOrUndefined = process.env.JSON_BASE_URL;
  const jsonBaseUrl = typeof options === 'undefined'
    ? jsonBaseUrlOrUndefined
    : typeof options.jsonBaseUrl === 'undefined'
      ? jsonBaseUrlOrUndefined
      : options.jsonBaseUrl;
  if (typeof jsonBaseUrl === 'undefined')
    throw new Error('jsonBaseUrl is not defined');
  const port = parseInt((process.env.PORT || '4000'), 10);
  const publicDir = join(process.cwd(), 'public');
  const urls = getUrls();
  const scriptUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/scripts/index.js' : urls.scriptUrl;
  const styleUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/styles/index.css' : urls.styleUrl;
  return {
    imageBaseUrl,
    jsonBaseUrl,
    port,
    publicDir,
    scriptUrl,
    styleUrl
  };
};

export { create };
