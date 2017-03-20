import { div, VNode } from '@cycle/dom';
import { State } from '../type/state';
import { view as entryListView } from './entry-list';
import { view as entryDetailView } from './entry-detail';
import { view as navView } from './nav';

const view = (state: State): VNode => {
  const {
    selectedEntryDetail,
    entryViewer,
    menu
  } = state;
  return div({
    props: {
      className: ['app', (menu ? 'is-menu' : '')].join(' ').trim()
    }
  }, [
      navView(state),
      entryListView(entryViewer),
      entryDetailView(selectedEntryDetail),
      navView(state)
    ]);
};

export { view };
