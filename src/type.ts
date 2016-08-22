import { EntryViewer } from './model/entry-viewer';

export { EntryViewer };

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

export interface State {
  entryViewer: EntryViewer;
  menu: boolean;
  entry: EntryDetail | null;
}
