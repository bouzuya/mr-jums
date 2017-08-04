import { EntryViewer } from '../../type/entry-viewer';

import { getNextEntry } from './get-next-entry';

const selectAndFocusNext = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { allEntries, partialEntries, selectedEntryId } = entryViewer;
  const nextSelectedEntry = getNextEntry(
    allEntries === null ? partialEntries : allEntries,
    selectedEntryId
  );
  if (nextSelectedEntry === null) return entryViewer;
  return {
    allEntries,
    partialEntries,
    focusedEntryId: nextSelectedEntry.id,
    selectedEntryId: nextSelectedEntry.id
  };
};

export { selectAndFocusNext as selectNext };
