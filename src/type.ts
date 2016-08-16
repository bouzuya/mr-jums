import { EntryViewer } from './model/entry-viewer';

export { EntryViewer };

export interface Entry {
  id: string;
  title: string;
  body: string;
}

export interface State {
  entryViewer: EntryViewer;
  entries: Entry[];
  offsetEntryIdInList: string | null;
  selectedEntryIdInList: string | null;
  selectedEntryId: string | null;
}
