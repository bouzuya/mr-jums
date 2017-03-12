import { Entry } from '../../type/entry';
import { EntryViewer } from '../../type/entry-viewer';

const createImpl = (
  entries: Entry[],
  focusedEntryId: string | null,
  selectedEntryId: string | null
): EntryViewer => {
  return {
    entries,
    focusedEntryId,
    selectedEntryId
  }
};

export {
  createImpl
};
