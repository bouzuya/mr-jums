import { EntryViewer } from '../../type/entry-viewer';

import { getPrevEntry } from './get-prev-entry';

const selectAndFocusPrev = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { allEntries, partialEntries, selectedEntryId } = entryViewer;
  const prevSelectedEntry = getPrevEntry(
    allEntries === null ? partialEntries : allEntries,
    selectedEntryId
  );
  if (prevSelectedEntry === null) return entryViewer;
  return {
    allEntries,
    partialEntries,
    focusedEntryId: prevSelectedEntry.id,
    selectedEntryId: prevSelectedEntry.id
  };
};

export { selectAndFocusPrev as selectPrev };
