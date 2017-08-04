import { EntryViewer } from '../../type/entry-viewer';

const focus = (
  entryViewer: EntryViewer,
  entryId: string | null
): EntryViewer => {
  const { allEntries, partialEntries, selectedEntryId } = entryViewer;
  const es = allEntries === null ? partialEntries : allEntries;
  if (es.length === 0) return entryViewer;
  const focusedEntry = es.find(({ id }) => id === entryId);
  if (typeof focusedEntry === 'undefined') return entryViewer;
  return {
    allEntries,
    partialEntries,
    focusedEntryId: focusedEntry.id,
    selectedEntryId
  };
};

export { focus };
