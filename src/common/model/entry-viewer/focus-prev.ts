import { EntryViewer } from '../../type/entry-viewer';

import { getPrevEntry } from './get-prev-entry';

const focusPrev = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { entries, focusedEntryId, selectedEntryId } = entryViewer;
  const prevFocusedEntry = getPrevEntry(entries, focusedEntryId);
  if (prevFocusedEntry === null) return entryViewer;
  return {
    entries,
    focusedEntryId: prevFocusedEntry.id,
    selectedEntryId
  };
};

export { focusPrev };
