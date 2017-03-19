import { join } from 'path';

import { ServerConfig } from '../../type/server-config';

const create = (): ServerConfig => {
  const port = parseInt((process.env.PORT || '4000'), 10);
  const publicDir = join(process.cwd(), 'public');
  return {
    port,
    publicDir
  };
};

export { create };
