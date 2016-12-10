import { EmptyEntryList, isEmptyEntryList } from './empty-entry-list';
import { Entry } from '../../type';
import { EntryList } from './entry-list';
import { NonEmptyEntryList, isNonEmptyEntryList } from './non-empty-entry-list';

const getEntries = (entryList: EntryList): Entry[] => {
  if (isEmptyEntryList(entryList)) {
    return [];
  } else if (isNonEmptyEntryList(entryList)) {
    const { _entries } = entryList;
    return _entries;
  } else {
    throw new Error();
  }
};

export { EmptyEntryList, EntryList, NonEmptyEntryList, getEntries };
