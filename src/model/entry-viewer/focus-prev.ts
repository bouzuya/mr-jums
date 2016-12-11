import { createImpl } from './entry-viewer-impl';
import { EntryViewer } from '../../type';
import {
  createEntryList,
  getFirstEntry,
  isEmptyEntryList
} from '../entry-list';
import {
  findPrevEntry,
  getAllEntries,
  getCurrentPageEntries,
  getOffsetEntryId,
  isEmptyPagedEntryList,
  isFirstEntryId,
  isFirstEntryIdInCurrentPage,
  offset
} from '../paged-entry-list';

const focusPrev = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { _pagedEntryList: pagedEntryList } = entryViewer;
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const entries = getAllEntries(pagedEntryList);
  const entryList = createEntryList(entries);
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  if (isEmptyEntryList(entryList)) return entryViewer;
  const pageEntries = getCurrentPageEntries(pagedEntryList);
  const pageEntryList = createEntryList(pageEntries);
  if (isEmptyEntryList(pageEntryList)) return entryViewer;
  if (entryViewer.focusedEntryId === null) return entryViewer;
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const prevOffsetEntryId =
    getFirstEntry(pageEntryList).id !== getFirstEntry(entryList).id &&
      isFirstEntryIdInCurrentPage(pagedEntryList, entryViewer.focusedEntryId)
      ? entries[currentPageFirstEntryIndex - 1].id : offsetEntryId;
  const prevFocusedEntry =
    isFirstEntryId(pagedEntryList, entryViewer.focusedEntryId)
      ? getFirstEntry(entryList)
      : findPrevEntry(
        pagedEntryList, entryViewer.focusedEntryId
      ); // TODO: getPrevEntry
  if (prevFocusedEntry === null) return entryViewer;
  return createImpl(
    offset(pagedEntryList, prevOffsetEntryId),
    prevFocusedEntry.id,
    entryViewer.selectedEntryId
  );
};

export { focusPrev };
