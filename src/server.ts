import * as express from 'express';
import * as compression from 'compression';
import * as fetch from 'isomorphic-fetch';
import * as morgan from 'morgan';
import { join } from 'path';
import { VNode } from '@cycle/dom';
import { StateData } from './type';
import { view as htmlView } from './view/dom/html';

const myFetch: typeof fetch = typeof global === 'undefined'
  ? fetch : (<any>global).fetch.bind(global);

type Params = { year: string, month: string; date: string; };

type Route = {
  name: string;
  params: Params | null;
};

// FIXME
const vnodeToString: (vnode: VNode) => string = require('snabbdom-to-html');

const render = (state: StateData): string => {
  return '<!DOCTYPE html>' + vnodeToString(htmlView(state));
};

// TODO: 404
const route = (path: string): Route => {
  const match = path.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/$/);
  if (match === null) {
    return { name: 'entry-list', params: null };
  } else {
    return {
      name: 'entry-detail',
      params: {
        year: match[1],
        month: match[2],
        date: match[3]
      }
    };
  }
};

const fetchDetail = ({ year, month, date }: Params): Promise<any> => {
  const url = `http://blog.bouzuya.net/${year}/${month}/${date}.json`;
  return myFetch(url).then((res) => res.json());
};

const fetchList = (): Promise<any> => {
  const url = 'http://blog.bouzuya.net/posts.json';
  return myFetch(url).then((res) => res.json());
};

const parseEntryList = (entries: any): Promise<StateData> => {
  const state = {
    entry: null,
    entries: entries.map(({
      date: id, title
    }: { date: string; title: string; }) => ({ id, title }))
      .sort((a: any, b: any) => {
        return a.id > b.id ? -1 : a.id === b.id ? 0 : 1;
      })
  };
  return Promise.resolve(state);
};

const initEntryDetail = (params: Params): Promise<StateData> => {
  return Promise.all([
    fetchDetail(params),
    fetchList()
  ]).then(([entry, entries]) => {
    const state = {
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
    };
    return Promise.resolve(state);
  });
};

const initEntryList = (_: null): Promise<StateData> => {
  return fetchList().then(parseEntryList);
};

// TODO: 404
const inits: {
  [name: string]: (params: Params | null) => Promise<StateData>;
} = {
    'entry-detail': initEntryDetail,
    'entry-list': initEntryList
  };

const init = ({ name, params }: Route): Promise<StateData> => {
  return inits[name](params);
};

const main = () => {
  const server = express();
  server.use(morgan('combined'));
  server.use(compression());
  // __dirname === '/lib'
  server.use(express.static(join(__dirname, '..', 'public')));
  server.use((req, res) => {
    return void Promise.resolve(req.originalUrl)
      .then((path) => route(path))
      .then((matchedRoute) => init(matchedRoute))
      .then((state) => render(state))
      .then(
      (html) => ({ status: 200, body: html }),
      () => ({ status: 500, body: JSON.stringify({ message: 'ERROR' }) })
      )
      .then(({ status, body }) => void res.status(status).send(body));
  });
  server.listen(parseInt((process.env.PORT || '4000'), 10));
};

main();
