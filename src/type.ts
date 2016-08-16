export interface Entry {
  title: string;
  body: string;
}

export interface State {
  entries: Entry[];
  checked: boolean;
}
