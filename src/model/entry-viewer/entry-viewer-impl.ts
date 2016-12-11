import { Entry, EntryViewer } from '../../type';
import {
  createEntryList,
  getFirstEntry,
  getLastEntry,
  isEmptyEntryList
} from '../entry-list';
import {
  PagedEntryList,
  findNextEntry,
  findPrevEntry,
  getAllEntries,
  getCurrentPageEntries,
  getOffsetEntryId,
  hasEntryId,
  hasEntryIdInCurrentPage,
  isEmptyPagedEntryList,
  isFirstEntryId,
  isFirstEntryIdInCurrentPage,
  isLastEntryId,
  isLastEntryIdInCurrentPage,
  offset
} from '../paged-entry-list';

const focus = (
  entryId: string,
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList
): EntryViewer => {
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  if (hasEntryId(pagedEntryList, entryId) === false) return entryViewer;
  const newOffsetEntryId = hasEntryIdInCurrentPage(pagedEntryList, entryId)
    ? getOffsetEntryId(pagedEntryList) : entryId;
  return new EntryViewerImpl(
    offset(pagedEntryList, newOffsetEntryId),
    entryId,
    entryViewer.selectedEntryId
  );
};

const focusNext = (
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList
): EntryViewer => {
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
  return new EntryViewerImpl(
    offset(pagedEntryList, nextOffsetEntryId),
    nextFocusedEntry.id,
    entryViewer.selectedEntryId
  );
};

const focusPrev = (
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList
): EntryViewer => {
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
  return new EntryViewerImpl(
    offset(pagedEntryList, prevOffsetEntryId),
    prevFocusedEntry.id,
    entryViewer.selectedEntryId
  );
};

const selectAndFocus = (
  entryId: string | undefined,
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList
): EntryViewer => {
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const id = typeof entryId === 'undefined'
    ? entryViewer.focusedEntryId : entryId;
  if (id === null) return entryViewer;
  if (hasEntryId(pagedEntryList, id) === false) return entryViewer;
  return new EntryViewerImpl(
    pagedEntryList,
    entryViewer.focusedEntryId,
    id
  ).focus(id);
};

const selectAndFocusNext = (
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList
): EntryViewer => {
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

const selectAndFocusPrev = (
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList
): EntryViewer => {
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
  return new EntryViewerImpl(
    offset(pagedEntryList, prevOffsetEntryId),
    prevSelectedEntry.id,
    prevSelectedEntry.id
  );
};

export class EntryViewerImpl {
  private readonly _pagedEntryList: PagedEntryList;

  constructor(
    pagedEntryList: PagedEntryList,
    public focusedEntryId: string | null,
    public selectedEntryId: string | null
  ) {
    this._pagedEntryList = pagedEntryList;
  }

  get filteredEntries(): Entry[] {
    return getCurrentPageEntries(this._pagedEntryList);
  }

  get selectedEntry(): Entry | null {
    const entry = this.filteredEntries
      .find((entry) => entry.id === this.selectedEntryId);
    return typeof entry === 'undefined' ? null : entry;
  }

  focus(entryId: string): EntryViewer {
    return focus(
      entryId,
      this,
      this._pagedEntryList
    );
  }

  focusNext(): EntryViewer {
    return focusNext(
      this,
      this._pagedEntryList
    );
  }

  focusPrev(): EntryViewer {
    return focusPrev(
      this,
      this._pagedEntryList
    );
  }

  select(entryId?: string): EntryViewer {
    return selectAndFocus(
      entryId,
      this,
      this._pagedEntryList
    );
  }

  selectNext(): EntryViewer {
    return selectAndFocusNext(
      this,
      this._pagedEntryList
    );
  }

  selectPrev(): EntryViewer {
    return selectAndFocusPrev(
      this,
      this._pagedEntryList
    );
  }
}
