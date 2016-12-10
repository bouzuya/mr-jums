import { EmptyEntryList } from './empty-entry-list';
import { Entry } from '../../type';
import { EntryList } from './entry-list';
import { NonEmptyEntryList } from './non-empty-entry-list';
import { isEmptyEntryList } from './is-empty-entry-list';
import { isNonEmptyEntryList } from './is-non-empty-entry-list';

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
