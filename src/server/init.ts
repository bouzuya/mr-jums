import { create } from '../common/model/state/index';
import { Entry } from '../common/type/entry';
import { ServerConfig } from '../common/type/server-config';
import { State } from '../common/type/state';
import { requestJson } from './request-json';
import { Params, Route } from './type';

interface ApiEntryDetail {
  data: string;
  date: string;
  html: string;
  minutes: number;
  pubdate: string;
  tags: string[];
  title: string;
}

interface ApiEntrySummary {
  date: string;
  title: string;
}

const fetchDetail = (
  { year, month, date }: Params,
  config: ServerConfig
): Promise<ApiEntryDetail> => {
  const path = `/${year}/${month}/${date}.json`;
  return requestJson(path, config).then((jsonString) => JSON.parse(jsonString));
};

const fetchList = (config: ServerConfig): Promise<ApiEntrySummary[]> => {
  const path = '/posts.json';
  return requestJson(path, config).then((jsonString) => JSON.parse(jsonString));
};

const buildPartialEntries = (
  allEntries: ApiEntrySummary[],
  entryId: string | null
): Entry[] => {
  const n = 15;
  const es = allEntries
    .map(({ date: id, title }) => ({ id, title }))
    .sort((a: { id: string; }, b: { id: string; }) => {
      return a.id > b.id ? -1 : a.id === b.id ? 0 : 1;
    });
  const index = Math.max(0, es.findIndex(({ id }) => id === entryId));
  return es.slice(
    Math.max(0, index - n),
    Math.min(es.length - 1, index + n + 1)
  );
};

const makeParseEntryList = (focusedEntryId: string | null) =>
  (entries: ApiEntrySummary[]): Promise<State> => {
    const state = create({
      entries: buildPartialEntries(entries, focusedEntryId),
      focus: focusedEntryId
    });
    return Promise.resolve(state);
  };

const makeParseEntryDetail = ({ year, month, date }: Params) => {
  return ([entry, entries]: [ApiEntryDetail, ApiEntrySummary[]]): Promise<State> => {
    const state = create({
      entry: {
        description: entry.data.substring(0, 100),
        id: entry.date,
        title: entry.title,
        html: entry.html,
        minutes: entry.minutes,
        pubdate: entry.pubdate,
        tags: entry.tags
      },
      entries: buildPartialEntries(entries, `${year}-${month}-${date}`),
      focus: `${year}-${month}-${date}`
    });
    return Promise.resolve(state);
  };
};

const initEntryDetail = (params: Params, config: ServerConfig): Promise<State> => {
  return Promise
    .all([fetchDetail(params, config), fetchList(config)])
    .then(makeParseEntryDetail(params));
};

const initEntryList = ({ year, month, date }: Params, config: ServerConfig): Promise<State> => {
  const focusedEntryId = typeof year === 'undefined'
    ? null
    : `${year}-${month}-${date}`;
  return fetchList(config).then(makeParseEntryList(focusedEntryId));
};

// TODO: 404
const inits: {
  [name: string]: (params: Params, config: ServerConfig) => Promise<State>;
} = {
    'entry-detail': initEntryDetail,
    'entry-list': initEntryList
  };

const init = ({ name, params }: Route, config: ServerConfig): Promise<State> => {
  return inits[name](params, config);
};

export { init };
