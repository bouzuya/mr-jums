import { EntryViewer } from '../../type/entry-viewer';

import { getPrevEntry } from './get-prev-entry';

const focusPrev = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { allEntries, entries, focusedEntryId, selectedEntryId } = entryViewer;
  const prevFocusedEntry = getPrevEntry(
    allEntries === null ? entries : allEntries,
    focusedEntryId
  );
  if (prevFocusedEntry === null) return entryViewer;
  return {
    allEntries,
    entries,
    focusedEntryId: prevFocusedEntry.id,
    selectedEntryId
  };
};

export { focusPrev };
