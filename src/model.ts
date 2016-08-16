import xs from 'xstream';
import { Action, ActionType, ToggleAction } from './action';
import { Entry, State } from './type';

const select = <T extends Action>(
  action$: xs<Action>, type: ActionType
): xs<T> => {
  return action$.filter((action) => action.type === type) as xs<T>;
};

const entries = [
  { id: '2016-01-02', title: 'My blog is dead', body: 'Good-bye, bbn-cycle!' },
  { id: '2016-01-01', title: 'My first entry', body: 'Hello, bbn-cycle!' }
];

const model = (action$: xs<Action>): xs<State> => {
  const checked$: xs<boolean> = select<ToggleAction>(action$, 'toggle')
    .map(({ checked }) => checked)
    .startWith(false);
  const entries$: xs<Entry[]> = xs.of(entries);
  const selectedEntry$: xs<Entry> = xs.of(entries[0]);
  const state$: xs<State> = xs
    .combine(checked$, entries$, selectedEntry$)
    .map(([
      checked,
      entries,
      selectedEntry
    ]) => ({ checked, entries, selectedEntry }));
  return state$;
};

export { model };
