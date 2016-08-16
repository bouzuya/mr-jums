import xs from 'xstream';
import { div, input, p, ul, li, VNode } from '@cycle/dom';
import { Entry, State } from '../../type';
import { view as entryView } from './entry';

const entriesView = (entries: Entry[]): VNode => {
  return div([
    ul(
      '.entry-list',
      entries.map((entry) => {
        return li(
          '.entry-list-item', [
            entryView(entry)
          ]);
      }))
  ]);
};

const appView = (state: State): VNode => {
  const { checked, entries } = state;
  return div([
    input({ attrs: { type: 'checkbox' } }), 'Toggle me',
    p(checked ? 'ON' : 'off'),
    entriesView(entries)
  ]);
};

const view = (state$: xs<State>): xs<VNode> => {
  const vnode$ = state$.map((state) => appView(state));
  return vnode$;
};

export { view };
