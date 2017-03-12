import { Entry } from '../../type/entry';
import { EntryViewer } from '../../type/entry-viewer';

const getNextFocusedEntry = (
  entries: Entry[], focusedEntryId: string | null
): Entry | null => {
  if (entries.length === 0) return null;
  // assert(focusedEntryId === null);
  const index = entries.findIndex(({ id }) => id === focusedEntryId);
  // assert(index >= 0) && assert(index < entries.length);
  if (index === entries.length - 1) return null; // last entry
  return entries[index + 1];
};

const selectAndFocusNext = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { entries, selectedEntryId } = entryViewer;
  if (entries.length === 0) return entryViewer;
  if (selectedEntryId === null) return entryViewer;
  const nextSelectedEntry = getNextFocusedEntry(entries, selectedEntryId);
  if (nextSelectedEntry === null) return entryViewer;
  return {
    entries,
    focusedEntryId: nextSelectedEntry.id,
    selectedEntryId: nextSelectedEntry.id
  };
};

export { selectAndFocusNext as selectNext };
