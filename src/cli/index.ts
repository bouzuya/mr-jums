import { createHash } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import { outputFileSync, outputJsonSync } from 'fs-extra';
import { join } from 'path';
import { parse } from 'url';
import { create } from '../common/model/server-config/create';
import { ServerConfig } from '../common/type/server-config';
import { State } from '../common/type/state';
import { init } from '../server/init';
import { render } from '../server/render';
import { Route, route } from '../server/route';

export interface Options {
  dstDir: string;
  imageBaseUrl?: string;
  incremental?: boolean;
  jsonBaseUrl?: string;
}

interface Cache {
  [path: string]: string;
}

interface EntryId {
  yyyy: string;
  mm: string;
  dd: string;
  idTitle?: string;
  digest: string;
}

const loadCache = (dstDir: string): Cache => {
  const path = join(dstDir, '.mr-jums', 'cache.json');
  if (!existsSync(path)) return {};
  const data = readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

const saveCache = (dstDir: string, cache: Cache): void => {
  const path = join(dstDir, '.mr-jums', 'cache.json');
  outputJsonSync(path, cache);
};

const calcDigest = (json: string): string => {
  return createHash('md5').update(json).digest('hex');
};

// ['2006-01-02', ...]
const loadEntryDates = (jsonDir: string): string[] => {
  const entriesData = readFileSync(join(jsonDir, 'posts.json'), 'utf-8');
  const entries = JSON.parse(entriesData) as { date: string; }[];
  return entries.map(({ date }) => date);
};

const loadEntryIds = (jsonDir: string): EntryId[] => {
  return loadEntryDates(jsonDir)
    .map((date) => {
      const [yyyy, mm, dd] = date.split('-');
      const path = join(jsonDir, yyyy, mm, dd, 'index.json');
      const data = readFileSync(path, 'utf-8');
      const digest = calcDigest(data);
      const { idTitle } = JSON.parse(data) as { idTitle?: string; };
      return { yyyy, mm, dd, idTitle, digest };
    });
};

// ['/' + '/2006/01/02/', '/2006/01/02/related/', '/2006/01/03/', ...]
const toPaths = (entryIds: EntryId[]): string[] => {
  return entryIds
    .map(({ yyyy, mm, dd, idTitle }) => {
      const title = (typeof idTitle === 'undefined' ? 'diary' : idTitle);
      const basePath = '/' + yyyy + '/' + mm + '/' + dd;
      return [
        basePath + '/',
        basePath + '/related/',
        basePath + '/' + title + '/'
      ];
    })
    .reduce((a, i) => a.concat(i), ['/']);
};

const processPath = (
  path: string,
  config: ServerConfig,
  dstDir: string
): Promise<void> => {
  return Promise.resolve(route(path))
    .then((route1: Route) => {
      if (route1.name === 'permanent-redirect') {
        const url = path.replace(/\/[^\/]*\/$/, '/');
        return init(route(url), config);
      } else {
        return init(route1, config);
      }
    })
    .then((state: State) => render(state, config))
    .then((html) => {
      const filePaths = [
        join(dstDir, path, 'index.html')
      ].concat(path.length === 1 ? [] : [
        join(dstDir, path.substring(0, path.length - 1) + '.html')
      ]);
      filePaths.forEach((p) => {
        outputFileSync(p, html);
        console.log(p);
      });
    });
};

const promiseFinally = (promise: Promise<any>, f: Function): Promise<any> => {
  return promise.then((r) => {
    try {
      f();
    } catch (_) {
      // do nothing
    }
    return r;
  }, (error) => {
    try {
      f();
    } catch (_) {
      // do nothing
    }
    return Promise.reject(error);
  });
};

const build = (options: Options) => {
  const dstDir = options.dstDir;
  const config = create(options);
  const jsonDir = parse(config.jsonBaseUrl).path;
  if (typeof jsonDir === 'undefined') throw new Error();
  const incremental = typeof options.incremental === 'undefined'
    ? false : options.incremental;
  const cache = incremental ? loadCache(dstDir) : {};
  const entryIds = loadEntryIds(jsonDir);
  const toProcessIds = incremental
    ? entryIds.filter(({ yyyy, mm, dd, digest }) => {
      return cache[`${yyyy}-${mm}-${dd}`] !== digest;
    })
    : entryIds
  return promiseFinally(toPaths(toProcessIds)
    .reduce((promise, path) => {
      return promise
        .then(() => new Promise<void>((resolve) => process.nextTick(resolve)))
        .then(() => processPath(path, config, dstDir));
    }, Promise.resolve())
    .then(() => {
      console.log('completed');
    }, (error) => {
      console.error(error);
    }), () => {
      if (!incremental) return;
      saveCache(dstDir, entryIds.reduce((a, { yyyy, mm, dd, digest }) => {
        return Object.assign(a, { [`${yyyy}-${mm}-${dd}`]: digest });
      }, {} as Cache));
    });
};

export { build };