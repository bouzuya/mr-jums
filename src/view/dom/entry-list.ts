import { VNode, div, ul, li } from '@cycle/dom';
import { Entry } from '../../type';
import { view as entryView } from './entry';
import { view as entryListView } from './partial/entry-list';

const view = (
  entries: Entry[],
  offsetEntryId: string | null,
  selectedEntryId: string | null
): VNode => {
  const entryListItems = entryListView(
    entries,
    offsetEntryId,
    10,
    (entry) => {
      const isSelected = entry.id === selectedEntryId;
      const className = [
        '.entry-list-item',
        '.entry-id-' + entry.id,
        isSelected ? '.is-selected' : ''
      ].join('');
      return li(className, [entryView(entry)]);
    }
  );
  return div([
    ul('.entry-list', entryListItems)
  ]);
};

export { view };
