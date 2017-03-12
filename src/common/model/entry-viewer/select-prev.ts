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

const selectAndFocusPrev = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { entries, selectedEntryId } = entryViewer;
  if (entries.length === 0) return entryViewer;
  if (selectedEntryId === null) return entryViewer;
  const prevSelectedEntry = getPrevFocusedEntry(entries, selectedEntryId);
  if (prevSelectedEntry === null) return entryViewer;
  return {
    entries,
    focusedEntryId: prevSelectedEntry.id,
    selectedEntryId: prevSelectedEntry.id
  };
};

export { selectAndFocusPrev as selectPrev };
