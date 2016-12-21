import { EntryList } from './entry-list';

export interface NonEmptyPagedEntryList {
  _type: 'non-empty-paged-entry-list';
  _entryList: EntryList;
  _offset: string;
  _count: number;
}
