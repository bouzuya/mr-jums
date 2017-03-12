import { EntryViewer } from '../../type/entry-viewer';

import { getNextEntry } from './get-next-entry';

const selectAndFocusNext = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { entries, selectedEntryId } = entryViewer;
  const nextSelectedEntry = getNextEntry(entries, selectedEntryId);
  if (nextSelectedEntry === null) return entryViewer;
  return {
    entries,
    focusedEntryId: nextSelectedEntry.id,
    selectedEntryId: nextSelectedEntry.id
  };
};

export { selectAndFocusNext as selectNext };
