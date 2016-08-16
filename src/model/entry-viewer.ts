import { Entry } from '../type';

export class EntryViewer {
  private readonly _entries: Entry[];
  private readonly _count: number;
  private readonly _offsetEntryId: string | null;
  private readonly _selectedEntryId: string | null;

  public static createForList(entries: Entry[]): EntryViewer {
    return new EntryViewer(
      entries,
      10,
      (entries.length > 0 ? entries[0].id : null),
      null
    );
  }

  public static createForDetail(entries: Entry[]): EntryViewer {
    return new EntryViewer(
      entries,
      1,
      null,
      null
    );
  }

  private constructor(
    entries: Entry[],
    count: number,
    offsetEntryId: string | null,
    selectedEntryId: string | null
  ) {
    this._entries = entries;
    this._count = count;
    this._offsetEntryId = offsetEntryId;
    this._selectedEntryId = selectedEntryId;
  }

  select(entryId: string): EntryViewer {
    const filtered = this._filteredEntries(
      this._entries, this._offsetEntryId, this._count
    );
    return new EntryViewer(
      this._entries,
      this._count,
      this._offsetEntryId,
      this._findEntryId(filtered, entryId)
    );
  }

  next(): EntryViewer {
    const filtered = this._filteredEntries(
      this._entries, this._offsetEntryId, this._count
    );
    return new EntryViewer(
      this._entries,
      this._count,
      this._offsetEntryId,
      this._findNextEntryId(filtered, this._selectedEntryId)
    );
  }

  prev(): EntryViewer {
    const filtered = this._filteredEntries(
      this._entries, this._offsetEntryId, this._count
    );
    return new EntryViewer(
      this._entries,
      this._count,
      this._offsetEntryId,
      this._findPrevEntryId(filtered, this._selectedEntryId)
    );
  }

  private _filteredEntries(
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

  private _findNextEntryId(
    entries: Entry[],
    currentEntryId: string | null
  ): string | null {
    if (currentEntryId === null) return entries[0].id;
    const index = entries.findIndex(({ id }) => id === currentEntryId);
    return index < 0 ? null : entries[index + 1].id;
  }

  private _findPrevEntryId(
    entries: Entry[],
    currentEntryId: string | null
  ): string | null {
    if (currentEntryId === null) return entries[entries.length - 1].id;
    const index = entries.findIndex(({ id }) => id === currentEntryId);
    return index <= 0 ? null : entries[index - 1].id;
  }
}
