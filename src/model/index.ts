import xs from 'xstream';
import {
  Action,
  ActionType,
  EnterAction,
  NextAction,
  PrevAction,
  SelectAction
} from '../action';
import { Entry, EntryViewer, State } from '../type';

const select = <T extends Action>(
  action$: xs<Action>, type: ActionType
): xs<T> => {
  return action$.filter((action) => action.type === type) as xs<T>;
};

const entries = [
  { id: '2016-01-31', title: 'Entry 31', body: 'Entry Body 31' },
  { id: '2016-01-30', title: 'Entry 30', body: 'Entry Body 30' },
  { id: '2016-01-29', title: 'Entry 29', body: 'Entry Body 29' },
  { id: '2016-01-28', title: 'Entry 28', body: 'Entry Body 28' },
  { id: '2016-01-27', title: 'Entry 27', body: 'Entry Body 27' },
  { id: '2016-01-26', title: 'Entry 26', body: 'Entry Body 26' },
  { id: '2016-01-25', title: 'Entry 25', body: 'Entry Body 25' },
  { id: '2016-01-24', title: 'Entry 24', body: 'Entry Body 24' },
  { id: '2016-01-23', title: 'Entry 23', body: 'Entry Body 23' },
  { id: '2016-01-22', title: 'Entry 22', body: 'Entry Body 22' },
  { id: '2016-01-21', title: 'Entry 21', body: 'Entry Body 21' },
  { id: '2016-01-20', title: 'Entry 20', body: 'Entry Body 20' },
  { id: '2016-01-19', title: 'Entry 19', body: 'Entry Body 19' },
  { id: '2016-01-18', title: 'Entry 18', body: 'Entry Body 18' },
  { id: '2016-01-17', title: 'Entry 17', body: 'Entry Body 17' },
  { id: '2016-01-16', title: 'Entry 16', body: 'Entry Body 16' },
  { id: '2016-01-15', title: 'Entry 15', body: 'Entry Body 15' },
  { id: '2016-01-14', title: 'Entry 14', body: 'Entry Body 14' },
  { id: '2016-01-13', title: 'Entry 13', body: 'Entry Body 13' },
  { id: '2016-01-12', title: 'Entry 12', body: 'Entry Body 12' },
  { id: '2016-01-11', title: 'Entry 11', body: 'Entry Body 11' },
  { id: '2016-01-10', title: 'Entry 10', body: 'Entry Body 10' },
  { id: '2016-01-09', title: 'Entry 09', body: 'Entry Body 09' },
  { id: '2016-01-08', title: 'Entry 08', body: 'Entry Body 08' },
  { id: '2016-01-07', title: 'Entry 07', body: 'Entry Body 07' },
  { id: '2016-01-06', title: 'Entry 06', body: 'Entry Body 06' },
  { id: '2016-01-05', title: 'Entry 05', body: 'Entry Body 05' },
  { id: '2016-01-04', title: 'Entry 04', body: 'Entry Body 04' },
  { id: '2016-01-03', title: 'Entry 03', body: 'Entry Body 03' },
  { id: '2016-01-02', title: 'My blog is dead', body: 'Good-bye, bbn-cycle!' },
  { id: '2016-01-01', title: 'My first entry', body: 'Hello, bbn-cycle!' }
];

const model = (action$: xs<Action>): xs<State> => {
  const entryViewer$: xs<EntryViewer> = xs
    .merge(
    select<SelectAction>(action$, 'select'),
    select<NextAction>(action$, 'next'),
    select<PrevAction>(action$, 'prev')
    )
    .fold((entryViewer, action) => {
      if (action.type === 'select') {
        return entryViewer.select(action.entryId);
      } else if (action.type === 'next') {
        return entryViewer.next();
      } else if (action.type === 'prev') {
        return entryViewer.prev();
      } else {
        // unknown action: do nothing
        return entryViewer;
      }
    }, EntryViewer.createForList(entries));

  const entries$: xs<Entry[]> = xs.of(entries);

  const selectedEntryIdInList$: xs<string | null> =
    entries$
      .map((entries) => {
        return xs
          .merge(
          select<SelectAction>(action$, 'select'),
          select<NextAction>(action$, 'next'),
          select<PrevAction>(action$, 'prev')
          )
          .map((action) => ({ action, entries }));
      })
      .flatten()
      .fold<string | null>((selectedEntryIdInList, { action, entries }) => {
        if (action.type === 'select') return action.entryId;
        if (entries.length === 0) return null;
        const index = entries
          .findIndex(({ id }) => id === selectedEntryIdInList);
        if (action.type === 'next') {
          if (selectedEntryIdInList === null) return entries[0].id;
          return index < 0 ? null : entries[index + 1].id;
        } else {
          if (selectedEntryIdInList === null) return null;
          return index <= 0 ? null : entries[index - 1].id;
        }
      }, null);

  const selectedEntryId$: xs<string | null> =
    xs.merge(
      selectedEntryIdInList$
        .map((entryId) => {
          return select<EnterAction>(action$, 'enter')
            .map(() => ({ entryId }));
        })
        .flatten(),
      select<SelectAction>(action$, 'select')
    )
      .map<string | null>(({ entryId }) => entryId)
      .startWith(null);

  const state$: xs<State> = xs
    .combine(
    entryViewer$,
    entries$,
    selectedEntryId$
    )
    .map(([
      entryViewer,
      entries,
      selectedEntryId
    ]) => ({
      entryViewer,
      entries,
      selectedEntryId
    }));
  return state$;
};

export { model };
