import { div, VNode } from '@cycle/dom';
import { State } from '../../type';
import { view as entryListView } from './entry-list';
import { view as entryDetailView } from './entry-detail';
import { view as navView } from './nav';

const view = (state: State): VNode => {
  const {
    entryViewer
  } = state;
  return div('.app', [
    entryListView(entryViewer),
    entryDetailView(entryViewer),
    navView()
  ]);
};

export { view };
