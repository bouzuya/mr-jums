import { EntryViewer } from './model/entry-viewer';

export { EntryViewer };

// interface EntrySummary {
//   date: string; // yyyy-mm-dd in +09:00
//   minutes: number;
//   pubdate: string; // yyyy-mm-ddThh:mm:ss+09:00
//   tags: string[];
//   title: string;
// }

export interface Entry {
  id: string; // = date (EntrySummary)
  title: string;
}

export interface State {
  entryViewer: EntryViewer;
  menu: boolean;
}
