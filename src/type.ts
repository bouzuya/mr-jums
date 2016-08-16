export interface Entry {
  id: string;
  title: string;
  body: string;
}

export interface State {
  checked: boolean;
  entries: Entry[];
  selectedEntryId: string | null;
}
