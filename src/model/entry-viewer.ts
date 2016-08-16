import { Entry } from '../type';

export class EntryViewer {
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
    private readonly entries: Entry[],
    private readonly count: number,
    private readonly offsetEntryId: string | null,
    private readonly selectedEntryId: string | null
  ) {
    // do nothing
  }

  select(entryId: string): EntryViewer {
    const filtered = this.filteredEntries(
      this.entries, this.offsetEntryId, this.count
    );
    return new EntryViewer(
      this.entries,
      this.count,
      this.offsetEntryId,
      this.findEntryId(filtered, entryId)
    );
  }

  next(): EntryViewer {
    const filtered = this.filteredEntries(
      this.entries, this.offsetEntryId, this.count
    );
    return new EntryViewer(
      this.entries,
      this.count,
      this.offsetEntryId,
      this.findNextEntryId(filtered, this.selectedEntryId)
    );
  }

  prev(): EntryViewer {
    const filtered = this.filteredEntries(
      this.entries, this.offsetEntryId, this.count
    );
    return new EntryViewer(
      this.entries,
      this.count,
      this.offsetEntryId,
      this.findPrevEntryId(filtered, this.selectedEntryId)
    );
  }

  private filteredEntries(
    entries: Entry[], offset: string | null, count: number
  ): Entry[] {
    if (offset === null) return [];
    return entries
      .filter(({ id }) => id <= offset) // entries order by desc
      .filter((_, index) => index < count);
  }

  private findEntryId(entries: Entry[], entryId: string): string | null {
    const index = entries.findIndex(({ id }) => id === entryId);
    return index < 0 ? null : entries[index].id;
  }

  private findNextEntryId(
    entries: Entry[],
    currentEntryId: string | null
  ): string | null {
    if (currentEntryId === null) return entries[0].id;
    const index = entries.findIndex(({ id }) => id === currentEntryId);
    return index < 0 ? null : entries[index + 1].id;
  }

  private findPrevEntryId(
    entries: Entry[],
    currentEntryId: string | null
  ): string | null {
    if (currentEntryId === null) return entries[entries.length - 1].id;
    const index = entries.findIndex(({ id }) => id === currentEntryId);
    return index <= 0 ? null : entries[index - 1].id;
  }
}
