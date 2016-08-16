import { div, input, p, VNode } from '@cycle/dom';
import { State } from '../../type';
import { view as entryListView } from './entry-list';
import { view as entryDetailView } from './entry-detail';

const view = (state: State): VNode => {
  const { checked, entries, selectedEntry } = state;
  return div([
    input({ attrs: { type: 'checkbox' } }), 'Toggle me',
    p(checked ? 'ON' : 'off'),
    div([
      entryListView(entries),
      entryDetailView(selectedEntry)
    ])
  ]);
};

export { view };
