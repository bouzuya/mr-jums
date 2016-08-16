export interface Entry {
  id: string;
  title: string;
  body: string;
}

export interface State {
  entries: Entry[];
  offsetEntryIdInList: string | null;
  selectedEntryIdInList: string | null;
  selectedEntryId: string | null;
}
