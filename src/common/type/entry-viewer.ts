import { Entry } from './entry';
import { PagedEntryList } from './paged-entry-list';

export interface EntryViewer {
  _pagedEntryList: PagedEntryList;
  entries: Entry[];
  filteredEntries: Entry[];
  focusedEntryId: string | null;
  selectedEntry: Entry | null;
  selectedEntryId: string | null;
}