import { EmptyEntryList, createEmptyEntryList } from './empty-entry-list';
import { Entry } from '../../common/type/entry';
import { EntryList } from './entry-list';
import { NonEmptyEntryList, createNonEmptyEntryList } from './non-empty-entry-list';

const createEntryList = (entries: Entry[]): EntryList => {
  if (entries.length === 0) {
    return createEmptyEntryList();
  } else {
    return createNonEmptyEntryList(entries);
  }
};

export { EmptyEntryList, EntryList, NonEmptyEntryList, createEntryList };
