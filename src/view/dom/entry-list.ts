import { VNode, div, ul, li } from '@cycle/dom';
import { EntryViewer } from '../../type';
import { view as entryView } from './entry';

const view = (
  entryViewer: EntryViewer
): VNode => {
  const { filteredEntries, selectedEntryId } = entryViewer;
  const entryListItems = filteredEntries.map((entry) => {
    const isSelected = entry.id === selectedEntryId;
    const className = [
      '.entry-list-item',
      '.entry-id-' + entry.id,
      isSelected ? '.is-selected' : ''
    ].join('');
    return li(className, [entryView(entry)]);
  });
  return div([
    ul('.entry-list', entryListItems)
  ]);
};

export { view };
