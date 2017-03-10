import { EmptyPagedEntryList } from '../../type/empty-paged-entry-list';
import {
  NonEmptyPagedEntryList
} from '../../type/non-empty-paged-entry-list';
import { PagedEntryList } from '../../type/paged-entry-list';
import { EntryViewer } from '../../type/entry-viewer';
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
  return {
    _pagedEntryList: pagedEntryList,
    entries,
    filteredEntries,
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
