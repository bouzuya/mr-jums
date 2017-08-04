import { EntryViewer } from '../../type/entry-viewer';

import { getNextEntry } from './get-next-entry';

const selectAndFocusNext = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { allEntries, entries, selectedEntryId } = entryViewer;
  const nextSelectedEntry = getNextEntry(
    allEntries === null ? entries : allEntries,
    selectedEntryId
  );
  if (nextSelectedEntry === null) return entryViewer;
  return {
    allEntries,
    entries,
    focusedEntryId: nextSelectedEntry.id,
    selectedEntryId: nextSelectedEntry.id
  };
};

export { selectAndFocusNext as selectNext };
