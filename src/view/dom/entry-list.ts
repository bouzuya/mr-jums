import { VNode, div, ul, li } from '@cycle/dom';
import { EntryViewer } from '../../type';
import { view as entryView } from './entry';

const view = (
  entryViewer: EntryViewer
): VNode => {
  const { filteredEntries, focusedEntryId } = entryViewer;
  const entryListItems = filteredEntries.map((entry) => {
    const isFocused = entry.id === focusedEntryId;
    const className = [
      '.entry-list-item',
      '.entry-id-' + entry.id,
      isFocused ? '.is-focused' : ''
    ].join('');
    return li(className, [entryView(entry)]);
  });
  return div('.entry-list', [
    ul('.entry-list', entryListItems)
  ]);
};

export { view };
