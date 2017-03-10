import { VNode, div, ul, li } from '@cycle/dom';
import { EntryViewer } from '../type/entry-viewer';
import { view as entryView } from './entry';
import { getCurrentPageEntries } from '../model/entry-viewer';

const view = (
  entryViewer: EntryViewer
): VNode => {
  const { focusedEntryId, selectedEntryId } = entryViewer;
  const currentPageEntries = getCurrentPageEntries(entryViewer);
  const entryListItems = currentPageEntries.map((entry) => {
    const isFocused = entry.id === focusedEntryId;
    const isSelected = entry.id === selectedEntryId;
    const className = [
      '.entry-list-item',
      '.entry-id-' + entry.id,
      isFocused ? '.is-focused' : '',
      isSelected ? '.is-selected' : ''
    ].join('');
    return li(className, [entryView(entry)]);
  });
  return div('.entry-list', [
    ul('.entry-list', entryListItems)
  ]);
};

export { view };
