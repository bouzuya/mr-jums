import { EntryDetail } from './entry-detail';
import { EntryViewer } from './entry-viewer';

export interface State {
  entryViewer: EntryViewer;
  menu: boolean;
  selectedEntryDetail: EntryDetail | null;
}
