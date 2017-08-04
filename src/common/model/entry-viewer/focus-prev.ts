import { EntryViewer } from '../../type/entry-viewer';

import { getPrevEntry } from './get-prev-entry';

const focusPrev = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { allEntries, partialEntries, focusedEntryId, selectedEntryId } = entryViewer;
  const prevFocusedEntry = getPrevEntry(
    allEntries === null ? partialEntries : allEntries,
    focusedEntryId
  );
  if (prevFocusedEntry === null) return entryViewer;
  return {
    allEntries,
    partialEntries,
    focusedEntryId: prevFocusedEntry.id,
    selectedEntryId
  };
};

export { focusPrev };
