import * as url from 'url';
import * as querystring from 'querystring';
import { VNode } from '@cycle/dom';
import { State } from '../common/type/state';
import { view as htmlView } from '../common/view/html';
import { ServerConfig } from '../common/type/server-config';
import { init } from './init';
import { route } from './route';

// FIXME
const vnodeToString: (vnode: VNode) => string = require('snabbdom-to-html');

const render = (state: State, config: ServerConfig): string => {
  const vnode = htmlView(
    state, config.scriptUrl, config.styleUrl, config.imageBaseUrl
  );
  return '<!DOCTYPE html>' + vnodeToString(vnode);
};

const buildQueryParams = (path: string): { focusedEntry: string | null } => {
  const u = url.parse(path);
  const q = querystring.parse(u.query);
  return {
    focusedEntry: typeof q['f'] === 'undefined' ? null : q['f']
  };
};

const requestHtml = (path: string, config: ServerConfig): Promise<string> => {
  return Promise.resolve(path)
    .then((path) => route(path))
    .then(({ name, params }) => ({
      name,
      params: Object.assign({}, params, buildQueryParams(path))
    }))
    .then((route) => init(route))
    .then((state) => render(state, config));
};

export { requestHtml };
