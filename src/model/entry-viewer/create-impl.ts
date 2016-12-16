import {
  EmptyPagedEntryList,
  NonEmptyPagedEntryList,
  PagedEntryList,
  EntryViewer
} from '../../type';
import {
  getAllEntries,
  getCurrentPageEntries,
} from '../paged-entry-list';

const createImpl = (
  pagedEntryList: PagedEntryList,
  focusedEntryId: string | null,
  selectedEntryId: string | null
): EntryViewer => {
  const entries = getAllEntries(pagedEntryList);
  const filteredEntries = getCurrentPageEntries(pagedEntryList);
  const entry = filteredEntries.find((entry) => entry.id === selectedEntryId);
  const selectedEntry = typeof entry === 'undefined' ? null : entry;
  return {
    _pagedEntryList: pagedEntryList,
    entries,
    filteredEntries,
    focusedEntryId,
    selectedEntry,
    selectedEntryId
  }
};

export {
  EmptyPagedEntryList,
  NonEmptyPagedEntryList,
  PagedEntryList,
  createImpl
};
