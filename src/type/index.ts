export interface EmptyEntryList {
  _type: 'empty-entry-list';
}

export interface NonEmptyEntryList {
  _type: 'non-empty-entry-list';
  // assert(_entries.length > 0) && assert(_entries are ordered by desc)
  _entries: Entry[];
}

export type EntryList = EmptyEntryList | NonEmptyEntryList;

export interface NonEmptyPagedEntryList {
  _type: 'non-empty-paged-entry-list';
  _entryList: EntryList;
  _offset: string;
  _count: number;
}

export interface EmptyPagedEntryList {
  _type: 'empty-paged-entry-list';
}

export type PagedEntryList = EmptyPagedEntryList | NonEmptyPagedEntryList;

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
  _pagedEntryList: PagedEntryList;
  entries: Entry[];
  filteredEntries: Entry[];
  focusedEntryId: string | null;
  selectedEntry: Entry | null;
  selectedEntryId: string | null;
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
