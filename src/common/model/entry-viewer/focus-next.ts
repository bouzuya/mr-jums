import { createImpl } from './create-impl';
import { EntryViewer } from '../../type/entry-viewer';
import {
  createEntryList,
  getLastEntry,
  isEmptyEntryList
} from '../entry-list';
import {
  findNextEntry,
  getAllEntries,
  getCurrentPageEntries,
  getOffsetEntryId,
  isEmptyPagedEntryList,
  isLastEntryId,
  isLastEntryIdInCurrentPage,
  offset
} from '../paged-entry-list';

const focusNext = (
  entryViewer: EntryViewer
): EntryViewer => {
  const { _pagedEntryList: pagedEntryList } = entryViewer;
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const entries = getAllEntries(pagedEntryList);
  const entryList = createEntryList(entries);
  if (isEmptyEntryList(entryList)) return entryViewer;
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  const pageEntries = getCurrentPageEntries(pagedEntryList);
  const pageEntryList = createEntryList(pageEntries);
  if (isEmptyEntryList(pageEntryList)) return entryViewer;
  if (entryViewer.focusedEntryId === null) return entryViewer;
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const nextOffsetEntryId =
    getLastEntry(pageEntryList).id !== getLastEntry(entryList).id &&
      isLastEntryIdInCurrentPage(pagedEntryList, entryViewer.focusedEntryId)
      ? entries[currentPageFirstEntryIndex + 1].id : offsetEntryId;
  const nextFocusedEntry =
    isLastEntryId(pagedEntryList, entryViewer.focusedEntryId)
      ? getLastEntry(entryList)
      : findNextEntry(
        pagedEntryList, entryViewer.focusedEntryId
      ); // TODO: getNextEntry
  if (nextFocusedEntry === null) return entryViewer;
  return createImpl(
    offset(pagedEntryList, nextOffsetEntryId),
    nextFocusedEntry.id,
    entryViewer.selectedEntryId
  );
};

export { focusNext };
