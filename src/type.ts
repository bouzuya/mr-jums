export interface Entry {
  id: string;
  title: string;
  body: string;
}

export interface State {
  entries: Entry[];
  selectedEntryIdInList: string | null;
  selectedEntryId: string | null;
}
