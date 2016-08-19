import { Entry } from '../type';

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
    return this._currentPageEntries(
      this._entries, this._offsetEntryId, this._count
    );
  }

  get focusedEntryId(): string | null {
    return this._focusedEntryId;
  }

  get selectedEntry(): Entry | null {
    const filtered = this._currentPageEntries(
      this._entries, this._offsetEntryId, this._count
    );
    const entry = filtered.find((entry) => entry.id === this._selectedEntryId);
    return typeof entry === 'undefined' ? null : entry;
  }

  get selectedEntryId(): string | null {
    return this._selectedEntryId;
  }

  select(entryId?: string): EntryViewer {
    const id = typeof entryId === 'undefined' ? this._focusedEntryId : entryId;
    if (id === null) return this;
    const filtered = this._currentPageEntries(
      this._entries, this._offsetEntryId, this._count
    );
    return new EntryViewer(
      this._entries,
      this._count,
      this._offsetEntryId,
      this._findEntryId(filtered, id),
      this._findEntryId(filtered, id)
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
    const currentPageLastEntryIndex = currentPageFirstEntryIndex + count - 1;
    const lastEntryIndex = entries.length - 1;
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

  private _currentPageEntries(
    entries: Entry[], offset: string | null, count: number
  ): Entry[] {
    if (offset === null) return [];
    return entries
      .filter(({ id }) => id <= offset) // entries order by desc
      .filter((_, index) => index < count);
  }

  private _findEntryId(entries: Entry[], entryId: string): string | null {
    const index = entries.findIndex(({ id }) => id === entryId);
    return index < 0 ? null : entries[index].id;
  }
}
