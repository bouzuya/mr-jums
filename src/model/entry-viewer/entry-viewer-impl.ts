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
  pagedEntryList: PagedEntryList,
  selectedEntryId: string | null
): EntryViewer => {
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  if (hasEntryId(pagedEntryList, entryId) === false) return entryViewer;
  const newOffsetEntryId = hasEntryIdInCurrentPage(pagedEntryList, entryId)
    ? getOffsetEntryId(pagedEntryList) : entryId;
  return new EntryViewerImpl(
    offset(pagedEntryList, newOffsetEntryId),
    entryId,
    selectedEntryId
  );
};

const focusNext = (
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList,
  focusedEntryId: string | null,
  selectedEntryId: string | null
): EntryViewer => {
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const entries = getAllEntries(pagedEntryList);
  const entryList = createEntryList(entries);
  if (isEmptyEntryList(entryList)) return entryViewer;
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  const pageEntries = getCurrentPageEntries(pagedEntryList);
  const pageEntryList = createEntryList(pageEntries);
  if (isEmptyEntryList(pageEntryList)) return entryViewer;
  if (focusedEntryId === null) return entryViewer;
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const nextOffsetEntryId =
    getLastEntry(pageEntryList).id !== getLastEntry(entryList).id &&
      isLastEntryIdInCurrentPage(pagedEntryList, focusedEntryId)
      ? entries[currentPageFirstEntryIndex + 1].id : offsetEntryId;
  const nextFocusedEntry =
    isLastEntryId(pagedEntryList, focusedEntryId)
      ? getLastEntry(entryList)
      : findNextEntry(pagedEntryList, focusedEntryId); // TODO: getNextEntry
  if (nextFocusedEntry === null) return entryViewer;
  return new EntryViewerImpl(
    offset(pagedEntryList, nextOffsetEntryId),
    nextFocusedEntry.id,
    selectedEntryId
  );
};

const focusPrev = (
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList,
  focusedEntryId: string | null,
  selectedEntryId: string | null
): EntryViewer => {
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const entries = getAllEntries(pagedEntryList);
  const entryList = createEntryList(entries);
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  if (isEmptyEntryList(entryList)) return entryViewer;
  const pageEntries = getCurrentPageEntries(pagedEntryList);
  const pageEntryList = createEntryList(pageEntries);
  if (isEmptyEntryList(pageEntryList)) return entryViewer;
  if (focusedEntryId === null) return entryViewer;
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const prevOffsetEntryId =
    getFirstEntry(pageEntryList).id !== getFirstEntry(entryList).id &&
      isFirstEntryIdInCurrentPage(pagedEntryList, focusedEntryId)
      ? entries[currentPageFirstEntryIndex - 1].id : offsetEntryId;
  const prevFocusedEntry =
    isFirstEntryId(pagedEntryList, focusedEntryId)
      ? getFirstEntry(entryList)
      : findPrevEntry(pagedEntryList, focusedEntryId); // TODO: getPrevEntry
  if (prevFocusedEntry === null) return entryViewer;
  return new EntryViewerImpl(
    offset(pagedEntryList, prevOffsetEntryId),
    prevFocusedEntry.id,
    selectedEntryId
  );
};

const selectAndFocus = (
  entryId: string | undefined,
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList,
  focusedEntryId: string | null
): EntryViewer => {
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const id = typeof entryId === 'undefined' ? focusedEntryId : entryId;
  if (id === null) return entryViewer;
  if (hasEntryId(pagedEntryList, id) === false) return entryViewer;
  return new EntryViewerImpl(
    pagedEntryList,
    focusedEntryId,
    id
  ).focus(id);
};

const selectAndFocusNext = (
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList,
  selectedEntryId: string | null
): EntryViewer => {
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const entries = getAllEntries(pagedEntryList);
  const entryList = createEntryList(entries);
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  if (isEmptyEntryList(entryList)) return entryViewer;
  const pageEntries = getCurrentPageEntries(pagedEntryList);
  const pageEntryList = createEntryList(pageEntries);
  if (isEmptyEntryList(pageEntryList)) return entryViewer;
  if (selectedEntryId === null) return entryViewer;
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const nextOffsetEntryId =
    getLastEntry(pageEntryList).id !== getLastEntry(entryList).id &&
      isLastEntryIdInCurrentPage(pagedEntryList, selectedEntryId)
      ? entries[currentPageFirstEntryIndex + 1].id : offsetEntryId;
  const nextSelectedEntry = isLastEntryId(pagedEntryList, selectedEntryId)
    ? getLastEntry(entryList)
    : findNextEntry(pagedEntryList, selectedEntryId); // TODO: getNextEntry
  if (nextSelectedEntry === null) return entryViewer;
  return new EntryViewerImpl(
    offset(pagedEntryList, nextOffsetEntryId),
    nextSelectedEntry.id,
    nextSelectedEntry.id
  );
};

const selectAndFocusPrev = (
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList,
  selectedEntryId: string | null
): EntryViewer => {
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const entries = getAllEntries(pagedEntryList);
  const entryList = createEntryList(entries);
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  if (isEmptyEntryList(entryList)) return entryViewer;
  const pageEntries = getCurrentPageEntries(pagedEntryList);
  const pageEntryList = createEntryList(pageEntries);
  if (isEmptyEntryList(pageEntryList)) return entryViewer;
  if (selectedEntryId === null) return entryViewer;
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const prevOffsetEntryId =
    getFirstEntry(pageEntryList).id !== getFirstEntry(entryList).id &&
      isFirstEntryIdInCurrentPage(pagedEntryList, selectedEntryId)
      ? entries[currentPageFirstEntryIndex - 1].id : offsetEntryId;
  const prevSelectedEntry = isFirstEntryId(pagedEntryList, selectedEntryId)
    ? getFirstEntry(entryList)
    : findPrevEntry(pagedEntryList, selectedEntryId);
  if (prevSelectedEntry === null) return entryViewer;
  return new EntryViewerImpl(
    offset(pagedEntryList, prevOffsetEntryId),
    prevSelectedEntry.id,
    prevSelectedEntry.id
  );
};

export class EntryViewerImpl {
  private readonly _pagedEntryList: PagedEntryList;
  private readonly _selectedEntryId: string | null;

  constructor(
    pagedEntryList: PagedEntryList,
    public focusedEntryId: string | null,
    selectedEntryId: string | null
  ) {
    this._pagedEntryList = pagedEntryList;
    this._selectedEntryId = selectedEntryId;
  }

  get filteredEntries(): Entry[] {
    return getCurrentPageEntries(this._pagedEntryList);
  }

  get selectedEntry(): Entry | null {
    const entry = this.filteredEntries
      .find((entry) => entry.id === this._selectedEntryId);
    return typeof entry === 'undefined' ? null : entry;
  }

  get selectedEntryId(): string | null {
    return this._selectedEntryId;
  }

  focus(entryId: string): EntryViewer {
    return focus(
      entryId,
      this,
      this._pagedEntryList,
      this._selectedEntryId
    );
  }

  focusNext(): EntryViewer {
    return focusNext(
      this,
      this._pagedEntryList,
      this.focusedEntryId,
      this._selectedEntryId
    );
  }

  focusPrev(): EntryViewer {
    return focusPrev(
      this,
      this._pagedEntryList,
      this.focusedEntryId,
      this._selectedEntryId
    );
  }

  select(entryId?: string): EntryViewer {
    return selectAndFocus(
      entryId,
      this,
      this._pagedEntryList,
      this.focusedEntryId
    );
  }

  selectNext(): EntryViewer {
    return selectAndFocusNext(
      this,
      this._pagedEntryList,
      this._selectedEntryId
    );
  }

  selectPrev(): EntryViewer {
    return selectAndFocusPrev(
      this,
      this._pagedEntryList,
      this._selectedEntryId
    );
  }
}
