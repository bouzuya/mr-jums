import { create } from '../common/model/state/index';
import { Entry } from '../common/type/entry';
import { State } from '../common/type/state';
import { requestJson } from './request-json';
import { Params, Route } from './type';

interface ApiEntryDetail {
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
  { year, month, date }: Params
): Promise<ApiEntryDetail> => {
  const path = `/${year}/${month}/${date}.json`;
  return requestJson(path).then((jsonString) => JSON.parse(jsonString));
};

const fetchList = (): Promise<ApiEntrySummary[]> => {
  const path = '/posts.json';
  return requestJson(path).then((jsonString) => JSON.parse(jsonString));
};

const buildPartialEntries = (
  allEntries: ApiEntrySummary[],
  entryId: string | null
): Entry[] => {
  const es = allEntries
    .map(({ date: id, title }) => ({ id, title }))
    .sort((a: { id: string; }, b: { id: string; }) => {
      return a.id > b.id ? -1 : a.id === b.id ? 0 : 1;
    });
  const index = Math.max(0, es.findIndex(({ id }) => id === entryId));
  return es.slice(
    Math.max(0, index - 4),
    Math.min(es.length - 1, index + 4 + 1)
  );
};

const makeParseEntryList = (focusedEntry: string | null) =>
  (entries: ApiEntrySummary[]): Promise<State> => {
    const state = create({
      entries: buildPartialEntries(entries, focusedEntry)
    });
    return Promise.resolve(state);
  };

const makeParseEntryDetail = ({ year, month, date }: Params) => {
  return ([entry, entries]: [ApiEntryDetail, ApiEntrySummary[]]): Promise<State> => {
    const state = create({
      entry: {
        id: entry.date,
        title: entry.title,
        html: entry.html,
        minutes: entry.minutes,
        pubdate: entry.pubdate,
        tags: entry.tags
      },
      entries: buildPartialEntries(entries, `${year}-${month}-${date}`)
    });
    return Promise.resolve(state);
  };
};

const initEntryDetail = (params: Params): Promise<State> => {
  return Promise
    .all([fetchDetail(params), fetchList()])
    .then(makeParseEntryDetail(params));
};

const initEntryList = ({ focusedEntry }: Params): Promise<State> => {
  return fetchList().then(makeParseEntryList(focusedEntry));
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
