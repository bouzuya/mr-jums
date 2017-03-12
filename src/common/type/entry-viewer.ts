import { Entry } from './entry';

export interface EntryViewer {
  entries: Entry[];
  focusedEntryId: string | null;
  selectedEntryId: string | null;
}
