import { join } from 'path';

import { ServerConfig } from '../../type/server-config';

const create = (): ServerConfig => {
  const port = parseInt((process.env.PORT || '4000'), 10);
  const publicDir = join(process.cwd(), 'public');
  const scriptUrl = (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001' : '') + '/scripts/index.js';
  const styleUrl = '/index.css';
  return {
    port,
    publicDir,
    scriptUrl,
    styleUrl
  };
};

export { create };
