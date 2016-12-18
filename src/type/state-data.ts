import { Entry } from './entry';
import { EntryDetail } from './entry-detail';

export interface StateData {
  entry: EntryDetail | null;
  entries: Entry[];
}

