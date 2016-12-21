import { getEntries } from './get-entries';
import { EmptyEntryList, isEmptyEntryList } from './empty-entry-list';
import { EntryList } from './entry-list';
import { NonEmptyEntryList, isNonEmptyEntryList } from './non-empty-entry-list';

const hasEntry = (
  entryList: EntryList,
  entryId: string
): boolean => {
  if (isEmptyEntryList(entryList)) {
    return false;
  } else if (isNonEmptyEntryList(entryList)) {
    const entries = getEntries(entryList);
    return entries.some(({ id }) => id === entryId);
  } else {
    throw new Error();
  }
};

export { EmptyEntryList, EntryList, NonEmptyEntryList, hasEntry };
