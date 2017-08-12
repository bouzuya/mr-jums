import { readFileSync } from 'fs';
import { outputFileSync } from 'fs-extra';
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
  jsonBaseUrl?: string;
}

interface EntryId {
  yyyy: string;
  mm: string;
  dd: string;
  idTitle?: string;
}

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
      const { idTitle } = JSON.parse(data) as { idTitle?: string; };
      return { yyyy, mm, dd, idTitle };
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

const processPath = (path: string, config: ServerConfig, dstDir: string): Promise<void> => {
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

const build = (options: Options) => {
  const dstDir = options.dstDir;
  const config = create(options);
  const jsonDir = parse(config.jsonBaseUrl).path;
  if (typeof jsonDir === 'undefined') throw new Error();
  toPaths(loadEntryIds(jsonDir))
    .reduce((promise, path) => {
      return promise
        .then(() => new Promise((resolve) => process.nextTick(resolve)))
        .then(() => processPath(path, config, dstDir));
    }, Promise.resolve())
    .then(() => {
      console.log('completed');
    }, (error) => {
      console.error(error);
    });
};

export { build };
