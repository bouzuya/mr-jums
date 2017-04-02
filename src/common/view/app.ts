import { div, VNode } from '@cycle/dom';
import { State } from '../type/state';
import { getCurrentSelectedEntry } from '../model/entry-viewer';
import { view as entryListView } from './entry-list';
import { view as entryDetailView } from './entry-detail';
import { view as navView } from './nav';

const view = (state: State): VNode => {
  const {
    selectedEntryDetail,
    entryViewer,
    focus
  } = state;
  const selectedEntry = getCurrentSelectedEntry(entryViewer);
  return div({
    props: {
      className: [
        'app',
        (focus === 'entry-list' ? 'is-menu' : '')
      ].join(' ').trim()
    }
  }, [
      navView(state),
      entryListView(entryViewer),
      entryDetailView(selectedEntry, selectedEntryDetail),
      navView(state)
    ]);
};

export { view };
