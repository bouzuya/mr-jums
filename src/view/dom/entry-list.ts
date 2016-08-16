import { VNode, div, ul, li } from '@cycle/dom';
import { Entry } from '../../type';
import { view as entryView } from './entry';
import { view as entryListView } from './partial/entry-list';

const view = (
  entries: Entry[],
  selectedEntryId: string | null
): VNode => {
  return div([
    ul(
      '.entry-list',
      entryListView(
        entries,
        '2016-01-21',
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
      )
    )
  ]);
};

export { view };
