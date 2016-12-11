export interface Entry {
  id: string;
  title: string;
}

export interface EntryDetail extends Entry {
  html: string;
  minutes: number;
  pubdate: string;
  tags: string[];
}

export interface EntryViewer {
  filteredEntries: Entry[];
  focusedEntryId: string | null;
  selectedEntry: Entry | null;
  selectedEntryId: string | null;
  selectPrev(): EntryViewer;
}

export interface State {
  entryViewer: EntryViewer;
  menu: boolean;
  entry: EntryDetail | null;
}

export interface StateData {
  entry: EntryDetail | null;
  entries: Entry[];
}
