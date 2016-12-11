import { Entry } from '../../type';
import {
  PagedEntryList,
  getCurrentPageEntries,
} from '../paged-entry-list';

export class EntryViewerImpl {
  public readonly filteredEntries: Entry[];
  public readonly selectedEntry: Entry | null;
  public readonly _pagedEntryList: PagedEntryList;

  constructor(
    pagedEntryList: PagedEntryList,
    public readonly focusedEntryId: string | null,
    public readonly selectedEntryId: string | null
  ) {
    const filteredEntries = getCurrentPageEntries(pagedEntryList);
    const entry = filteredEntries.find((entry) => entry.id === selectedEntryId);
    const selectedEntry = typeof entry === 'undefined' ? null : entry;
    this._pagedEntryList = pagedEntryList;
    this.filteredEntries = filteredEntries;
    this.selectedEntry = selectedEntry;
  }
}
