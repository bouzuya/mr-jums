import { Entry } from './entry';

export interface EntryViewer {
  allEntries: Entry[] | null;
  entries: Entry[];
  focusedEntryId: string | null;
  selectedEntryId: string | null;
}
