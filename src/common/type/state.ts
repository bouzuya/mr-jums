import { EntryDetail } from './entry-detail';
import { EntryViewer } from './entry-viewer';
import { StateCommand } from './state-command';

export interface State {
  entryViewer: EntryViewer;
  focus: 'entry-list' | 'entry-detail';
  lastCommand?: StateCommand;
  selectedEntryDetail: EntryDetail | null;
}
