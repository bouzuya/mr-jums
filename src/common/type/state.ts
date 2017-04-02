import { EntryDetail } from './entry-detail';
import { EntryViewer } from './entry-viewer';

export interface State {
  entryViewer: EntryViewer;
  focus: 'entry-list' | 'entry-detail';
  selectedEntryDetail: EntryDetail | null;
}
