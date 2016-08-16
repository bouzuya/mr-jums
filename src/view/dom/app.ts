import { div, input, p, VNode } from '@cycle/dom';
import { State } from '../../type';
import { view as entryListView } from './entry-list';

const view = (state: State): VNode => {
  const { checked, entries } = state;
  return div([
    input({ attrs: { type: 'checkbox' } }), 'Toggle me',
    p(checked ? 'ON' : 'off'),
    entryListView(entries)
  ]);
};

export { view };
