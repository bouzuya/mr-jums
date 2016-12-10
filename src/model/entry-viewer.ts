import { Entry, EntryViewer } from '../type';
import { findEntryId } from './entry-viewer/find-entry-id';
import { hasEntry } from './entry-viewer/has-entry';
import {
  EntryList,
  createEntryList,
  getEntries,
  getFirstEntry,
  getLastEntry,
  getPageEntries,
  isEmptyEntryList,
  isFirstEntryId,
  isLastEntryId
} from './entry-list';

const create = (entries: Entry[]): EntryViewer => {
  return new EntryViewerImpl(
    createEntryList(entries),
    10,
    (entries.length > 0 ? entries[0].id : null),
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
  entryList: EntryList,
  count: number,
  offsetEntryId: string | null,
  selectedEntryId: string | null
): EntryViewer => {
  if (hasEntry(getEntries(entryList), entryId) === false) return entryViewer;
  const newOffsetEntryId = isInCurrentPage(entryViewer.filteredEntries, entryId)
    ? offsetEntryId : entryId;
  return new EntryViewerImpl(
    entryList,
    count,
    newOffsetEntryId,
    entryId,
    selectedEntryId
  );
};

const focusNext = (
  entryViewer: EntryViewer,
  entryList: EntryList,
  count: number,
  focusedEntryId: string | null,
  offsetEntryId: string | null,
  selectedEntryId: string | null
): EntryViewer => {
  if (isEmptyEntryList(entryList)) return entryViewer;
  const entries = getEntries(entryList);
  const currentPageEntryList = createEntryList(entryViewer.filteredEntries);
  if (isEmptyEntryList(currentPageEntryList)) return entryViewer;
  if (focusedEntryId === null) return entryViewer;
  if (offsetEntryId === null) return entryViewer;
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
    entryList,
    count,
    nextOffsetEntryId,
    nextFocusedEntry.id,
    selectedEntryId
  );
};

const focusPrev = (
  entryViewer: EntryViewer,
  entryList: EntryList,
  count: number,
  focusedEntryId: string | null,
  offsetEntryId: string | null,
  selectedEntryId: string | null
): EntryViewer => {
  if (isEmptyEntryList(entryList)) return entryViewer;
  const entries = getEntries(entryList);
  const currentPageEntryList = createEntryList(entryViewer.filteredEntries);
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
    entryList,
    count,
    prevOffsetEntryId,
    prevFocusedEntry.id,
    selectedEntryId
  );
};

const selectAndFocus = (
  entryId: string | undefined,
  entryViewer: EntryViewer,
  entryList: EntryList,
  count: number,
  offsetEntryId: string | null,
  focusedEntryId: string | null
): EntryViewer => {
  const id = typeof entryId === 'undefined' ? focusedEntryId : entryId;
  if (id === null) return entryViewer;
  if (hasEntry(getEntries(entryList), id) === false) return entryViewer;
  return new EntryViewerImpl(
    entryList,
    count,
    offsetEntryId,
    focusedEntryId,
    id
  ).focus(id);
};

class EntryViewerImpl {
  private readonly _entryList: EntryList;
  private readonly _count: number;
  private readonly _offsetEntryId: string | null;
  private readonly _focusedEntryId: string | null;
  private readonly _selectedEntryId: string | null;

  constructor(
    entryList: EntryList,
    count: number,
    offsetEntryId: string | null,
    focusedEntryId: string | null,
    selectedEntryId: string | null
  ) {
    this._entryList = entryList;
    this._count = count;
    this._offsetEntryId = offsetEntryId;
    this._focusedEntryId = focusedEntryId;
    this._selectedEntryId = selectedEntryId;
  }

  get filteredEntries(): Entry[] {
    if (this._offsetEntryId === null) return [];
    return getPageEntries(this._entryList, this._offsetEntryId, this._count);
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
      this._entryList,
      this._count,
      this._offsetEntryId,
      this._selectedEntryId
    );
  }

  focusNext(): EntryViewer {
    return focusNext(
      this,
      this._entryList,
      this._count,
      this._focusedEntryId,
      this._offsetEntryId,
      this._selectedEntryId
    );
  }

  focusPrev(): EntryViewer {
    return focusPrev(
      this,
      this._entryList,
      this._count,
      this._focusedEntryId,
      this._offsetEntryId,
      this._selectedEntryId
    );
  }

  select(entryId?: string): EntryViewer {
    return selectAndFocus(
      entryId,
      this,
      this._entryList,
      this._count,
      this._offsetEntryId,
      this._focusedEntryId
    );
  }

  selectNext(): EntryViewer {
    const entryList = this._entryList;
    if (isEmptyEntryList(entryList)) return this;
    const entries = getEntries(this._entryList);
    const currentPageEntryList = createEntryList(this.filteredEntries);
    if (isEmptyEntryList(currentPageEntryList)) return this;
    const selectedEntryId = this._selectedEntryId;
    if (selectedEntryId === null) return this;
    const offsetEntryId = this._offsetEntryId;
    if (offsetEntryId === null) return this;
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
      this._entryList,
      this._count,
      nextOffsetEntryId,
      nextSelectedEntryId,
      nextSelectedEntryId
    );
  }

  selectPrev(): EntryViewer {
    const entryList = this._entryList;
    if (isEmptyEntryList(entryList)) return this;
    const entries = getEntries(this._entryList);
    const currentPageEntryList = createEntryList(this.filteredEntries);
    if (isEmptyEntryList(currentPageEntryList)) return this;
    const selectedEntryId = this._selectedEntryId;
    if (selectedEntryId === null) return this;
    const offsetEntryId = this._offsetEntryId;
    if (offsetEntryId === null) return this;
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
      this._entryList,
      this._count,
      prevOffsetEntryId,
      prevSelectedEntryId,
      prevSelectedEntryId
    );
  }
}

export { create };
