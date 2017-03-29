import { create } from '../common/model/state/index';
import { State } from '../common/type/state';
import { requestJson } from './request-json';
import { Params, Route } from './type';

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

export { init };
