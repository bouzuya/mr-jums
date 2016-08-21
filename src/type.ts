import { EntryViewer } from './model/entry-viewer';

export { EntryViewer };

export interface Entry {
  id: string;
  title: string;
}

export interface State {
  entryViewer: EntryViewer;
  menu: boolean;
}
