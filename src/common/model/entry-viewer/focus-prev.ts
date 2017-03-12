import { Entry } from '../../type/entry';
import { EntryViewer } from '../../type/entry-viewer';

const getPrevFocusedEntry = (
  entries: Entry[], focusedEntryId: string | null
): Entry | null => {
  if (entries.length === 0) return null;
  // assert(focusedEntryId === null);
  const index = entries.findIndex(({ id }) => id === focusedEntryId);
  // assert(index >= 0) && assert(index < entries.length);
  if (index === 0) return null; // first entry
  return entries[index - 1];
};

const focusPrev = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { entries, focusedEntryId, selectedEntryId } = entryViewer;
  const prevFocusedEntry = getPrevFocusedEntry(entries, focusedEntryId);
  if (prevFocusedEntry === null) return entryViewer;
  return {
    entries,
    focusedEntryId: prevFocusedEntry.id,
    selectedEntryId
  };
};

export { focusPrev };
