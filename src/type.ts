export interface Entry {
  id: string;
  title: string;
  body: string;
}

export interface State {
  checked: boolean;
  entries: Entry[];
  selectedEntryIdInList: string | null;
  selectedEntryId: string | null;
}
