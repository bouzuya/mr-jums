import { readFileSync } from 'fs';
import { outputFileSync } from 'fs-extra';
import { join } from 'path';
import { parse } from 'url';
import { create } from '../common/model/server-config/create';
import { State } from '../common/type/state';
import { init } from '../server/init';
import { render } from '../server/render';
import { Route, route } from '../server/route';

const build = (dstDir: string) => {
  const config = create();
  const jsonDir = parse(config.jsonBaseUrl).path;
  if (typeof jsonDir === 'undefined') throw new Error();
  const entriesData = readFileSync(join(jsonDir, 'posts.json'), 'utf-8');
  const entries = JSON.parse(entriesData) as { date: string; }[];
  // paths = ['/' + '/2006/01/02/', '/2006/01/02/related/', '/2006/01/03/', ...]
  const paths = entries
    .map(({ date }) => {
      const entryData = readFileSync(join.apply(null, [jsonDir].concat(date.split('-'), 'index.json')), 'utf-8');
      const { idTitle } = JSON.parse(entryData) as { idTitle?: string; };
      return { date, idTitle };
    })
    .map(({ date, idTitle }) => {
      const path = '/' + date.split('-').join('/') + '/';
      return [
        path,
        path + 'related/',
        path + (typeof idTitle === 'undefined' ? 'diary' : idTitle) + '/'
      ];
    })
    .reduce((a, i) => a.concat(i), ['/']);
  paths
    .reduce((promise, path) => {
      return promise
        .then(() => new Promise((resolve) => process.nextTick(resolve)))
        .then(() => route(path))
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
    }, Promise.resolve())
    .then(() => {
      console.log('completed');
    }, (error) => {
      console.error(error);
    });
};

export { build };
