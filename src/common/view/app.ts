import { VNode, a, div, footer, header, h1 } from '@cycle/dom';
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
  const siteTitle = 'blog.bouzuya.net';
  return div({
    props: {
      className: [
        'app',
        (focus === 'entry-list' ? 'is-menu' : '')
      ].join(' ').trim()
    }
  }, [
      header('.header', [
        h1('.title', [a({ props: { href: '/' } }, [siteTitle])]),
        navView(state)
      ]),
      div('.body', [
        entryDetailView(selectedEntry, selectedEntryDetail),
        entryListView(entryViewer)
      ]),
      footer('.footer', [
        navView(state)
      ])
    ]);
};

export { view };
