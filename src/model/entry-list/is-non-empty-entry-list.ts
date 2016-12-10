import { EmptyEntryList } from './empty-entry-list';
import { EntryList } from './entry-list';
import { NonEmptyEntryList } from './non-empty-entry-list';

const isNonEmptyEntryList = (
  entryList: EntryList
): entryList is NonEmptyEntryList => {
  // assert(entryList._entries.length > 0);
  // assert(entryList is ordered by desc)
  return entryList._type === 'non-empty-entry-list';
};

export { EmptyEntryList, EntryList, NonEmptyEntryList, isNonEmptyEntryList };
