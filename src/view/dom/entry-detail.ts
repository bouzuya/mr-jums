import { VNode, div } from '@cycle/dom';
import { Entry } from '../../type';
import { view as entryView } from './entry';
import { view as entryListView } from './partial/entry-list';

const view = (
  entries: Entry[],
  selectedEntryId: string | null
): VNode | null => {
  if (selectedEntryId === null) return null;
  return div(
    entryListView(
      entries,
      selectedEntryId,
      1,
      (entry) => entryView(entry)
    )
  );
};

export { view };
