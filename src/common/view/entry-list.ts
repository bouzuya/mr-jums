import { VNode, a, div, footer, header, h1, ul, li, nav, span } from '@cycle/dom';
import { Entry } from '../type/entry';
import { EntryViewer } from '../type/entry-viewer';
import { getCurrentPageEntries } from '../model/entry-viewer';

const entryView = (entry: Entry): VNode => {
  const permalink = '/' + entry.id.split('-').join('/') + '/';
  return div('.entry', [
    a({ props: { href: permalink } }, [
      span('.id', [entry.id]),
      span('.separator', [' ']),
      span('.title', [entry.title])
    ])
  ]);
};

const view = (
  entryViewer: EntryViewer
): VNode => {
  const { focusedEntryId, selectedEntryId } = entryViewer;
  const currentPageEntries = getCurrentPageEntries(entryViewer);
  const index = currentPageEntries.findIndex(({ id }) => id === focusedEntryId);
  const entry: Entry | null = focusedEntryId === null || currentPageEntries.length === 0
    ? null
    : focusedEntryId === currentPageEntries[0].id
      ? null
      : currentPageEntries[index];
  const entryListItems = currentPageEntries.map((entry) => {
    const isFocused = entry.id === focusedEntryId;
    const isSelected = entry.id === selectedEntryId;
    const className = [
      '.entry-list-item',
      '.entry-id-' + entry.id,
      isFocused ? '.is-focused' : '',
      isSelected ? '.is-selected' : ''
    ].join('');
    return li(className, { key: entry.id }, [entryView(entry)]);
  });
  const classNames = {
    [`index-${index}`]: true,
    [`count-${currentPageEntries.length}`]: true
  };
  const permalink = entry === null
    ? '/'
    : '/' + entry.id.split('-').join('/') + '/related/';
  const title = entry === null
    ? '最近の記事'
    : '『' + entry.id + ' ' + entry.title + '』の関連記事';
  return div('.entry-list', [
    nav([
      header('.header', [
        h1([a({ props: { href: permalink } }, [title])])
      ]),
      div('.body', [
        ul('.entry-list', { class: classNames }, entryListItems)
      ]),
      footer('.footer', [])
    ])
  ]);
};

export { view };
