import { EntryViewer } from '../../type/entry-viewer';

import { getNextEntry } from './get-next-entry';

const focusNext = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { allEntries, partialEntries, focusedEntryId, selectedEntryId } = entryViewer;
  const nextFocusedEntry = getNextEntry(
    allEntries === null ? partialEntries : allEntries,
    focusedEntryId
  );
  if (nextFocusedEntry === null) return entryViewer;
  return {
    allEntries,
    partialEntries,
    focusedEntryId: nextFocusedEntry.id,
    selectedEntryId
  };
};

export { focusNext };
