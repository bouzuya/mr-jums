import { Entry } from './entry';
import { EntryDetail } from './entry-detail';

export interface SerializedData {
  entry: EntryDetail | null;
  entries: Entry[];
}

