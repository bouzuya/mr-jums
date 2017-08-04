import { Entry } from './entry';

export interface EntryViewer {
  allEntries: Entry[] | null;
  partialEntries: Entry[];
  focusedEntryId: string | null;
  selectedEntryId: string | null;
}
