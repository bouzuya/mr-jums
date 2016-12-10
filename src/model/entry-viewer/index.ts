import { Entry, EntryViewer } from '../../type';
import { hasEntry } from './has-entry';
import {
  EntryList,
  createEntryList,
  getEntries,
  getFirstEntry,
  getLastEntry,
  isEmptyEntryList,
  isFirstEntryId,
  isLastEntryId
} from '../entry-list';
import {
  PagedEntryList,
  createPagedEntryList,
  getAllEntries,
  getCurrentPageEntries,
  getMaxCountPerPage,
  getOffsetEntryId,
  isEmptyPagedEntryList
} from '../paged-entry-list';

const getCurrentPageEntryList = (entryViewer: EntryViewer): EntryList => {
  return createEntryList(entryViewer.filteredEntries);
};

const create = (entries: Entry[]): EntryViewer => {
  return new EntryViewerImpl(
    createPagedEntryList(
      createEntryList(entries),
      10,
      (entries.length > 0 ? entries[0].id : null)
    ),
    (entries.length > 0 ? entries[0].id : null),
    null
  );
};

const isInCurrentPage = (
  filteredEntries: Entry[], entryId: string
): boolean => {
  return hasEntry(filteredEntries, entryId);
};

const focus = (
  entryId: string,
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList,
  selectedEntryId: string | null
): EntryViewer => {
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const entries = getAllEntries(pagedEntryList);
  if (hasEntry(entries, entryId) === false) return entryViewer;
  const entryList = createEntryList(entries);
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  const newOffsetEntryId = isInCurrentPage(entryViewer.filteredEntries, entryId)
    ? offsetEntryId : entryId;
  return new EntryViewerImpl(
    createPagedEntryList(
      entryList,
      getMaxCountPerPage(pagedEntryList),
      newOffsetEntryId
    ),
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
  const currentPageEntryList = getCurrentPageEntryList(entryViewer);
  if (isEmptyEntryList(currentPageEntryList)) return entryViewer;
  if (focusedEntryId === null) return entryViewer;
  const focusedEntryIndex = entries
    .findIndex(({ id }) => id === focusedEntryId);
  if (focusedEntryIndex < 0) throw new Error();
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const nextOffsetEntryId =
    getLastEntry(currentPageEntryList).id !== getLastEntry(entryList).id &&
      isLastEntryId(currentPageEntryList, focusedEntryId)
      ? entries[currentPageFirstEntryIndex + 1].id : offsetEntryId;
  const nextFocusedEntry =
    isLastEntryId(entryList, focusedEntryId)
      ? getLastEntry(entryList) : entries[focusedEntryIndex + 1];
  return new EntryViewerImpl(
    createPagedEntryList(
      entryList,
      getMaxCountPerPage(pagedEntryList),
      nextOffsetEntryId
    ),
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
  const entryList = createEntryList(getAllEntries(pagedEntryList));
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  if (isEmptyEntryList(entryList)) return entryViewer;
  const entries = getEntries(entryList);
  const currentPageEntryList = getCurrentPageEntryList(entryViewer);
  if (isEmptyEntryList(currentPageEntryList)) return entryViewer;
  if (focusedEntryId === null) return entryViewer;
  if (offsetEntryId === null) return entryViewer;
  const focusedEntryIndex = entries
    .findIndex(({ id }) => id === focusedEntryId);
  if (focusedEntryIndex < 0) throw new Error();
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const prevOffsetEntryId =
    getFirstEntry(currentPageEntryList).id !== getFirstEntry(entryList).id &&
      isFirstEntryId(currentPageEntryList, focusedEntryId)
      ? entries[currentPageFirstEntryIndex - 1].id : offsetEntryId;
  const prevFocusedEntry =
    isFirstEntryId(entryList, focusedEntryId)
      ? getFirstEntry(entryList) : entries[focusedEntryIndex - 1];
  return new EntryViewerImpl(
    createPagedEntryList(
      entryList,
      getMaxCountPerPage(pagedEntryList),
      prevOffsetEntryId
    ),
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
  const entryList = createEntryList(getAllEntries(pagedEntryList));
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  const id = typeof entryId === 'undefined' ? focusedEntryId : entryId;
  if (id === null) return entryViewer;
  if (hasEntry(getEntries(entryList), id) === false) return entryViewer;
  return new EntryViewerImpl(
    createPagedEntryList(
      entryList,
      getMaxCountPerPage(pagedEntryList),
      offsetEntryId
    ),
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
  const entryList = createEntryList(getAllEntries(pagedEntryList));
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  if (isEmptyEntryList(entryList)) return entryViewer;
  const entries = getEntries(entryList);
  const currentPageEntryList = getCurrentPageEntryList(entryViewer);
  if (isEmptyEntryList(currentPageEntryList)) return entryViewer;
  if (selectedEntryId === null) return entryViewer;
  if (offsetEntryId === null) return entryViewer;
  const selectedEntryIndex = entries
    .findIndex(({ id }) => id === selectedEntryId);
  if (selectedEntryIndex < 0) throw new Error();
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const nextOffsetEntryId =
    getLastEntry(currentPageEntryList).id !== getLastEntry(entryList).id &&
      isLastEntryId(currentPageEntryList, selectedEntryId)
      ? entries[currentPageFirstEntryIndex + 1].id : offsetEntryId;
  const nextSelectedEntryId = isLastEntryId(entryList, selectedEntryId)
    ? getLastEntry(entryList).id : entries[selectedEntryIndex + 1].id;
  return new EntryViewerImpl(
    createPagedEntryList(
      entryList,
      getMaxCountPerPage(pagedEntryList),
      nextOffsetEntryId
    ),
    nextSelectedEntryId,
    nextSelectedEntryId
  );
};

const selectAndFocusPrev = (
  entryViewer: EntryViewer,
  pagedEntryList: PagedEntryList,
  selectedEntryId: string | null
): EntryViewer => {
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const entryList = createEntryList(getAllEntries(pagedEntryList));
  const offsetEntryId = getOffsetEntryId(pagedEntryList);
  if (isEmptyEntryList(entryList)) return entryViewer;
  const entries = getEntries(entryList);
  const currentPageEntryList = getCurrentPageEntryList(entryViewer);
  if (isEmptyEntryList(currentPageEntryList)) return entryViewer;
  if (selectedEntryId === null) return entryViewer;
  if (offsetEntryId === null) return entryViewer;
  const selectedEntryIndex = entries
    .findIndex(({ id }) => id === selectedEntryId);
  if (selectedEntryIndex < 0) throw new Error();
  const currentPageFirstEntryIndex = entries
    .findIndex(({ id }) => id === offsetEntryId);
  if (currentPageFirstEntryIndex < 0) throw new Error();
  const prevOffsetEntryId =
    getFirstEntry(currentPageEntryList).id !== getFirstEntry(entryList).id &&
      isFirstEntryId(currentPageEntryList, selectedEntryId)
      ? entries[currentPageFirstEntryIndex - 1].id : offsetEntryId;
  const prevSelectedEntryId = isFirstEntryId(entryList, selectedEntryId)
    ? getFirstEntry(entryList).id : entries[selectedEntryIndex - 1].id;
  return new EntryViewerImpl(
    createPagedEntryList(
      entryList,
      getMaxCountPerPage(pagedEntryList),
      prevOffsetEntryId
    ),
    prevSelectedEntryId,
    prevSelectedEntryId
  );
};

class EntryViewerImpl {
  private readonly _pagedEntryList: PagedEntryList;
  private readonly _focusedEntryId: string | null;
  private readonly _selectedEntryId: string | null;

  constructor(
    pagedEntryList: PagedEntryList,
    focusedEntryId: string | null,
    selectedEntryId: string | null
  ) {
    this._pagedEntryList = pagedEntryList;
    this._focusedEntryId = focusedEntryId;
    this._selectedEntryId = selectedEntryId;
  }

  get filteredEntries(): Entry[] {
    return getCurrentPageEntries(this._pagedEntryList);
  }

  get focusedEntryId(): string | null {
    return this._focusedEntryId;
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
      this._focusedEntryId,
      this._selectedEntryId
    );
  }

  focusPrev(): EntryViewer {
    return focusPrev(
      this,
      this._pagedEntryList,
      this._focusedEntryId,
      this._selectedEntryId
    );
  }

  select(entryId?: string): EntryViewer {
    return selectAndFocus(
      entryId,
      this,
      this._pagedEntryList,
      this._focusedEntryId
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

export { create };
