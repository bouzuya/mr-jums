import { EntryViewer } from '../../type/entry-viewer';

const selectAndFocus = (
  entryViewer: EntryViewer,
  entryId?: string
): EntryViewer => {
  if (typeof entryId === 'undefined') {
    const { entries, focusedEntryId } = entryViewer;
    if (entries.length === 0) return entryViewer;
    return {
      entries,
      focusedEntryId,
      selectedEntryId: focusedEntryId
    };
  } else {
    const { entries } = entryViewer;
    if (entries.length === 0) return entryViewer;
    const selectedEntry = entries.find(({ id }) => id === entryId);
    if (typeof selectedEntry === 'undefined') return entryViewer;
    return {
      entries,
      focusedEntryId: selectedEntry.id,
      selectedEntryId: selectedEntry.id
    };
  }
};

export { selectAndFocus as select };
