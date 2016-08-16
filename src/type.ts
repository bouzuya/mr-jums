export interface Entry {
  title: string;
  body: string;
}

export interface State {
  checked: boolean;
  entries: Entry[];
  selectedEntry: Entry | null;
}
