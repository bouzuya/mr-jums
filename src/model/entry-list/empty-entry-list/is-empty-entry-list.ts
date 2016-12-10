import { EmptyEntryList } from './empty-entry-list';
import { EntryList } from '../entry-list';
import { NonEmptyEntryList } from '../non-empty-entry-list';

const isEmptyEntryList = (
  entryList: EntryList
): entryList is EmptyEntryList => {
  return entryList._type === 'empty-entry-list';
};

export { EmptyEntryList, EntryList, NonEmptyEntryList, isEmptyEntryList };
