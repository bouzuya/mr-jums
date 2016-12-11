import { EntryViewer } from '../../type';
import { EntryViewerImpl } from './entry-viewer-impl';
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

const selectAndFocusNext = (
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
  const nextOffsetEntryId =
    getLastEntry(pageEntryList).id !== getLastEntry(entryList).id &&
      isLastEntryIdInCurrentPage(pagedEntryList, entryViewer.selectedEntryId)
      ? entries[currentPageFirstEntryIndex + 1].id : offsetEntryId;
  const nextSelectedEntry = isLastEntryId(
    pagedEntryList, entryViewer.selectedEntryId
  )
    ? getLastEntry(entryList)
    : findNextEntry(
      pagedEntryList, entryViewer.selectedEntryId
    ); // TODO: getNextEntry
  if (nextSelectedEntry === null) return entryViewer;
  return new EntryViewerImpl(
    offset(pagedEntryList, nextOffsetEntryId),
    nextSelectedEntry.id,
    nextSelectedEntry.id
  );
};

export { selectAndFocusNext as selectNext };
