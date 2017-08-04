import { EntryViewer } from '../../type/entry-viewer';

import { getNextEntry } from './get-next-entry';

const focusNext = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { allEntries, entries, focusedEntryId, selectedEntryId } = entryViewer;
  const nextFocusedEntry = getNextEntry(
    allEntries === null ? entries : allEntries,
    focusedEntryId
  );
  if (nextFocusedEntry === null) return entryViewer;
  return {
    allEntries,
    entries,
    focusedEntryId: nextFocusedEntry.id,
    selectedEntryId
  };
};

export { focusNext };
