import { EntryViewer } from '../../type/entry-viewer';

import { getPrevEntry } from './get-prev-entry';

const selectAndFocusPrev = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { allEntries, entries, selectedEntryId } = entryViewer;
  const prevSelectedEntry = getPrevEntry(
    allEntries === null ? entries : allEntries,
    selectedEntryId
  );
  if (prevSelectedEntry === null) return entryViewer;
  return {
    allEntries,
    entries,
    focusedEntryId: prevSelectedEntry.id,
    selectedEntryId: prevSelectedEntry.id
  };
};

export { selectAndFocusPrev as selectPrev };
