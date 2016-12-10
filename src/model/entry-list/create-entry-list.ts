import { EmptyEntryList } from './empty-entry-list';
import { Entry } from '../../type';
import { EntryList } from './entry-list';
import { NonEmptyEntryList } from './non-empty-entry-list';
import { createEmptyEntryList } from './create-empty-entry-list';
import { createNonEmptyEntryList } from './create-non-empty-entry-list';

const createEntryList = (entries: Entry[]): EntryList => {
  if (entries.length === 0) {
    return createEmptyEntryList();
  } else {
    return createNonEmptyEntryList(entries);
  }
};

export { EmptyEntryList, EntryList, NonEmptyEntryList, createEntryList };
