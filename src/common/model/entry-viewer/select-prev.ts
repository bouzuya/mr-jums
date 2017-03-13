import { EntryViewer } from '../../type/entry-viewer';

import { getPrevEntry } from './get-prev-entry';

const selectAndFocusPrev = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { entries, selectedEntryId } = entryViewer;
  const prevSelectedEntry = getPrevEntry(entries, selectedEntryId);
  if (prevSelectedEntry === null) return entryViewer;
  return {
    entries,
    focusedEntryId: prevSelectedEntry.id,
    selectedEntryId: prevSelectedEntry.id
  };
};

export { selectAndFocusPrev as selectPrev };
