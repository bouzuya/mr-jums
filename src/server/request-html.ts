import { requestJson } from './request-json';
import { VNode } from '@cycle/dom';
import { State } from '../common/type/state';
import { create } from '../common/model/state/index';
import { view as htmlView } from '../common/view/html';
import { ServerConfig } from '../common/type/server-config';
import { route } from './route';
import { Params, Route } from './type';

// FIXME
const vnodeToString: (vnode: VNode) => string = require('snabbdom-to-html');

const render = (state: State, config: ServerConfig): string => {
  const vnode = htmlView(
    state, config.scriptUrl, config.styleUrl, config.imageBaseUrl
  );
  return '<!DOCTYPE html>' + vnodeToString(vnode);
};

const fetchDetail = ({ year, month, date }: Params): Promise<any> => {
  const path = `/${year}/${month}/${date}.json`;
  return requestJson(path).then((jsonString) => JSON.parse(jsonString));
};

const fetchList = (): Promise<any> => {
  const path = '/posts.json';
  return requestJson(path).then((jsonString) => JSON.parse(jsonString));
};

const parseEntryList = (entries: any): Promise<State> => {
  const state = create({
    entries: entries.map(({
      date: id, title
    }: { date: string; title: string; }) => ({ id, title }))
      .sort((a: any, b: any) => {
        return a.id > b.id ? -1 : a.id === b.id ? 0 : 1;
      })
  });
  return Promise.resolve(state);
};

const initEntryDetail = (params: Params): Promise<State> => {
  return Promise.all([
    fetchDetail(params),
    fetchList()
  ]).then(([entry, entries]) => {
    const state = create({
      entry: {
        id: <string>entry.date,
        title: <string>entry.title,
        html: <string>entry.html,
        minutes: <number>entry.minutes,
        pubdate: <string>entry.pubdate,
        tags: <string[]>entry.tags
      },
      entries: entries.map(({
        date: id, title
      }: { date: string; title: string; }) => ({ id, title }))
        .sort((a: any, b: any) => {
          return a.id > b.id ? -1 : a.id === b.id ? 0 : 1;
        })
    });
    return Promise.resolve(state);
  });
};

const initEntryList = (_: Params): Promise<State> => {
  return fetchList().then(parseEntryList);
};

// TODO: 404
const inits: {
  [name: string]: (params: Params) => Promise<State>;
} = {
    'entry-detail': initEntryDetail,
    'entry-list': initEntryList
  };

const init = ({ name, params }: Route): Promise<State> => {
  return inits[name](params);
};

const requestHtml = (path: string, config: ServerConfig): Promise<string> => {
  return Promise.resolve(path)
    .then((path) => route(path))
    .then((matchedRoute) => init(matchedRoute))
    .then((state) => render(state, config));
};

export { requestHtml };
