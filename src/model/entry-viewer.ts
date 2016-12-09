import { Entry } from '../type';
import { currentPageEntries } from './entry-viewer/current-page-entries';
import { findEntryId } from './entry-viewer/find-entry-id';
import { hasEntry } from './entry-viewer/has-entry';

export class EntryViewer {
  private readonly _entries: Entry[];
  private readonly _count: number;
  private readonly _offsetEntryId: string | null;
  private readonly _focusedEntryId: string | null;
  private readonly _selectedEntryId: string | null;

  public static create(entries: Entry[]): EntryViewer {
    return new EntryViewer(
      entries,
      10,
      (entries.length > 0 ? entries[0].id : null),
      (entries.length > 0 ? entries[0].id : null),
      null
    );
  }

  private constructor(
    entries: Entry[],
    count: number,
    offsetEntryId: string | null,
    focusedEntryId: string | null,
    selectedEntryId: string | null
  ) {
    this._entries = entries;
    this._count = count;
    this._offsetEntryId = offsetEntryId;
    this._focusedEntryId = focusedEntryId;
    this._selectedEntryId = selectedEntryId;
  }

  get filteredEntries(): Entry[] {
    return currentPageEntries(
      this._entries, this._offsetEntryId, this._count
    );
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
    const newFocusedEntryId = findEntryId(this._entries, entryId);
    if (newFocusedEntryId === null) return this;
    return new EntryViewer(
      this._entries,
      this._count,
      this._isInCurrentPage(entryId) ? this._offsetEntryId : newFocusedEntryId,
      newFocusedEntryId,
      this._selectedEntryId
    );
  }

  focusNext(): EntryViewer {
    const entries = this._entries;
    const focusedEntryId = this._focusedEntryId;
    const offsetEntryId = this._offsetEntryId;
    const count = this._count;
    const focusedEntryIndex = entries
      .findIndex(({ id }) => id === focusedEntryId);
    if (focusedEntryIndex < 0) throw new Error();
    const currentPageFirstEntryIndex = entries
      .findIndex(({ id }) => id === offsetEntryId);
    if (currentPageFirstEntryIndex < 0) throw new Error();
    const lastEntryIndex = entries.length - 1;
    const currentPageLastEntryIndex =
      currentPageFirstEntryIndex + count - 1 > lastEntryIndex
        ? lastEntryIndex
        : currentPageFirstEntryIndex + count - 1;
    const isLastPage = currentPageLastEntryIndex === lastEntryIndex;
    const isLastEntryInPage = currentPageLastEntryIndex === focusedEntryIndex;
    const isLastEntry = focusedEntryIndex === lastEntryIndex;
    const nextOffsetEntryId = !isLastPage && isLastEntryInPage
      ? entries[currentPageFirstEntryIndex + 1].id : offsetEntryId;
    const nextFocusedEntryId = isLastEntry
      ? focusedEntryId : entries[focusedEntryIndex + 1].id;
    return new EntryViewer(
      this._entries,
      this._count,
      nextOffsetEntryId,
      nextFocusedEntryId,
      this._selectedEntryId
    );
  }

  focusPrev(): EntryViewer {
    const entries = this._entries;
    const focusedEntryId = this._focusedEntryId;
    const offsetEntryId = this._offsetEntryId;
    const focusedEntryIndex = entries
      .findIndex(({ id }) => id === focusedEntryId);
    if (focusedEntryIndex < 0) throw new Error();
    const currentPageFirstEntryIndex = entries
      .findIndex(({ id }) => id === offsetEntryId);
    if (currentPageFirstEntryIndex < 0) throw new Error();
    const isFirstPage = currentPageFirstEntryIndex === 0;
    const isFirstEntryInPage = currentPageFirstEntryIndex === focusedEntryIndex;
    const isFirstEntry = focusedEntryIndex === 0;
    const prevOffsetEntryId = !isFirstPage && isFirstEntryInPage
      ? entries[currentPageFirstEntryIndex - 1].id : offsetEntryId;
    const prevFocusedEntryId = isFirstEntry
      ? focusedEntryId : entries[focusedEntryIndex - 1].id;
    return new EntryViewer(
      this._entries,
      this._count,
      prevOffsetEntryId,
      prevFocusedEntryId,
      this._selectedEntryId
    );
  }

  select(entryId?: string): EntryViewer {
    const id = typeof entryId === 'undefined' ? this._focusedEntryId : entryId;
    if (id === null) return this;
    const newSelectedEntryId = this._entries.some((entry) => entry.id === id)
      ? id : this._selectedEntryId;
    const selectionUpdated = new EntryViewer(
      this._entries,
      this._count,
      this._offsetEntryId,
      this._focusedEntryId,
      newSelectedEntryId
    );
    return newSelectedEntryId === null
      ? selectionUpdated : selectionUpdated.focus(newSelectedEntryId);
  }

  selectNext(): EntryViewer {
    const entries = this._entries;
    const selectedEntryId = this._selectedEntryId;
    const offsetEntryId = this._offsetEntryId;
    const count = this._count;
    if (selectedEntryId === null) return this;
    const selectedEntryIndex = entries
      .findIndex(({ id }) => id === selectedEntryId);
    if (selectedEntryIndex < 0) throw new Error();
    const currentPageFirstEntryIndex = entries
      .findIndex(({ id }) => id === offsetEntryId);
    if (currentPageFirstEntryIndex < 0) throw new Error();
    const lastEntryIndex = entries.length - 1;
    const currentPageLastEntryIndex =
      currentPageFirstEntryIndex + count - 1 > lastEntryIndex
        ? lastEntryIndex
        : currentPageFirstEntryIndex + count - 1;
    const isLastPage = currentPageLastEntryIndex === lastEntryIndex;
    const isLastEntryInPage = currentPageLastEntryIndex === selectedEntryIndex;
    const isLastEntry = selectedEntryIndex === lastEntryIndex;
    const nextOffsetEntryId = !isLastPage && isLastEntryInPage
      ? entries[currentPageFirstEntryIndex + 1].id : offsetEntryId;
    const nextSelectedEntryId = isLastEntry
      ? selectedEntryId : entries[selectedEntryIndex + 1].id;
    return new EntryViewer(
      this._entries,
      this._count,
      nextOffsetEntryId,
      nextSelectedEntryId,
      nextSelectedEntryId
    );
  }


  selectPrev(): EntryViewer {
    const entries = this._entries;
    const selectedEntryId = this._selectedEntryId;
    const offsetEntryId = this._offsetEntryId;
    if (selectedEntryId === null) return this;
    const selectedEntryIndex = entries
      .findIndex(({ id }) => id === selectedEntryId);
    if (selectedEntryIndex < 0) throw new Error();
    const currentPageFirstEntryIndex = entries
      .findIndex(({ id }) => id === offsetEntryId);
    if (currentPageFirstEntryIndex < 0) throw new Error();
    const isFirstPage = currentPageFirstEntryIndex === 0;
    const isFirstEntryInPage = currentPageFirstEntryIndex === selectedEntryIndex;
    const isFirstEntry = selectedEntryIndex === 0;
    const prevOffsetEntryId = !isFirstPage && isFirstEntryInPage
      ? entries[currentPageFirstEntryIndex - 1].id : offsetEntryId;
    const prevSelectedEntryId = isFirstEntry
      ? selectedEntryId : entries[selectedEntryIndex - 1].id;
    return new EntryViewer(
      this._entries,
      this._count,
      prevOffsetEntryId,
      prevSelectedEntryId,
      prevSelectedEntryId
    );
  }

  private _isInCurrentPage(entryId: string): boolean {
    return hasEntry(this.filteredEntries, entryId);
  }
}
