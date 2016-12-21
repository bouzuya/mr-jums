import { div, VNode } from '@cycle/dom';
import { State } from '../../type';
import { view as entryListView } from './entry-list';
import { view as entryDetailView } from './entry-detail';
import { view as navView } from './nav';

const view = (state: State): VNode => {
  const {
    entry,
    entryViewer,
    menu
  } = state;
  return div({
    props: {
      className: ['app', (menu ? 'is-menu' : '')].join(' ').trim()
    }
  }, [
      entryListView(entryViewer),
      entryDetailView(entry),
      navView(state)
    ]);
};

export { view };
