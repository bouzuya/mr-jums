import { Entry } from './entry';

export interface NonEmptyEntryList {
  _type: 'non-empty-entry-list';
  // assert(_entries.length > 0) && assert(_entries are ordered by desc)
  _entries: Entry[];
}
