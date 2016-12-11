import {
  EmptyPagedEntryList,
  NonEmptyPagedEntryList,
  PagedEntryList,
  EntryViewer
} from '../../type';
import {
  getCurrentPageEntries,
} from '../paged-entry-list';

const createImpl = (
  pagedEntryList: PagedEntryList,
  focusedEntryId: string | null,
  selectedEntryId: string | null
): EntryViewer => {
  const filteredEntries = getCurrentPageEntries(pagedEntryList);
  const entry = filteredEntries.find((entry) => entry.id === selectedEntryId);
  const selectedEntry = typeof entry === 'undefined' ? null : entry;
  return {
    filteredEntries,
    selectedEntry,
    _pagedEntryList: pagedEntryList,
    focusedEntryId,
    selectedEntryId
  }
};

export {
  EmptyPagedEntryList,
  NonEmptyPagedEntryList,
  PagedEntryList,
  createImpl
};
