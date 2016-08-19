import { div, VNode } from '@cycle/dom';
import { State } from '../../type';
import { view as entryListView } from './entry-list';
import { view as entryDetailView } from './entry-detail';
import { view as navView } from './nav';

const view = (state: State): VNode => {
  const {
    entryViewer,
    menu
  } = state;
  return div('.app' + (menu ? '.is-menu' : ''), [
    entryListView(entryViewer),
    entryDetailView(entryViewer),
    navView()
  ]);
};

export { view };
