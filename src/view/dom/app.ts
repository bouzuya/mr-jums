import { div, VNode } from '@cycle/dom';
import { State } from '../../type';
import { view as entryListView } from './entry-list';
import { view as entryDetailView } from './entry-detail';

const view = (state: State): VNode => {
  const {
    entryViewer,
    entries,
    selectedEntryId
  } = state;
  return div([
    entryListView(entryViewer),
    entryDetailView(entries, selectedEntryId),
    div('.next', ['J']),
    div('.prev', ['K']),
    div('.enter', ['L'])
  ]);
};

export { view };
