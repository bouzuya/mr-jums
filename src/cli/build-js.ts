import { existsSync, readdirSync } from 'fs';
import { copySync } from 'fs-extra';
import { dirname, join } from 'path';

const getJsDir = (): string | null => {
  const f = (d: string): string | null => {
    if (existsSync(join(d, 'package.json'))) return d;
    const p = dirname(d);
    return p === d ? null : f(p);
  };
  const p = f(__dirname);
  return p === null ? null : join(p, 'public', 'scripts');
};

const buildJs = (dstDir: string): Promise<void> => {
  const dir = getJsDir();
  if (dir === null) throw new Error('js dir is not found');
  const fileName = readdirSync(dir)[0];
  if (typeof fileName === 'undefined') throw new Error('js file is not found');
  copySync(join(dir, fileName), join(dstDir, 'scripts', fileName));
  return Promise.resolve();
};

export { buildJs };
