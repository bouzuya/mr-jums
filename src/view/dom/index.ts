import xs from 'xstream';
import { div, input, p, VNode } from '@cycle/dom';
import { State } from '../../type';
import { view as entryListView } from './entry-list';

const appView = (state: State): VNode => {
  const { checked, entries } = state;
  return div([
    input({ attrs: { type: 'checkbox' } }), 'Toggle me',
    p(checked ? 'ON' : 'off'),
    entryListView(entries)
  ]);
};

const view = (state$: xs<State>): xs<VNode> => {
  const vnode$ = state$.map((state) => appView(state));
  return vnode$;
};

export { view };
