import { EntryViewer } from '../../type/entry-viewer';

const selectAndFocus = (
  entryViewer: EntryViewer,
  entryId?: string
): EntryViewer => {
  if (typeof entryId === 'undefined') {
    const { allEntries, partialEntries, focusedEntryId } = entryViewer;
    const es = allEntries === null ? partialEntries : allEntries;
    if (es.length === 0) return entryViewer;
    return {
      allEntries,
      partialEntries,
      focusedEntryId,
      selectedEntryId: focusedEntryId
    };
  } else {
    const { allEntries, partialEntries } = entryViewer;
    const es = allEntries === null ? partialEntries : allEntries;
    if (es.length === 0) return entryViewer;
    const selectedEntry = es.find(({ id }) => id === entryId);
    if (typeof selectedEntry === 'undefined') return entryViewer;
    return {
      allEntries,
      partialEntries,
      focusedEntryId: selectedEntry.id,
      selectedEntryId: selectedEntry.id
    };
  }
};

export { selectAndFocus as select };
