import { Entry } from './entry';
import { PagedEntryList } from './paged-entry-list';

export interface EntryViewer {
  _pagedEntryList: PagedEntryList;
  entries: Entry[];
  focusedEntryId: string | null;
  selectedEntryId: string | null;
}
