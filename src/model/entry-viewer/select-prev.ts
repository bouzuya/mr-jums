import { EntryViewer } from '../../common/type/entry-viewer';
import { createImpl } from './create-impl';
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

const selectAndFocusPrev = (
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
  if (entryViewer.selectedEntryId === null) return entryViewer;
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const prevOffsetEntryId =
    getFirstEntry(pageEntryList).id !== getFirstEntry(entryList).id &&
      isFirstEntryIdInCurrentPage(pagedEntryList, entryViewer.selectedEntryId)
      ? entries[currentPageFirstEntryIndex - 1].id : offsetEntryId;
  const prevSelectedEntry = isFirstEntryId(
    pagedEntryList, entryViewer.selectedEntryId
  )
    ? getFirstEntry(entryList)
    : findPrevEntry(pagedEntryList, entryViewer.selectedEntryId);
  if (prevSelectedEntry === null) return entryViewer;
  return createImpl(
    offset(pagedEntryList, prevOffsetEntryId),
    prevSelectedEntry.id,
    prevSelectedEntry.id
  );
};

export { selectAndFocusPrev as selectPrev };
