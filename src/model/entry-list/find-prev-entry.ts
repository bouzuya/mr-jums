import { getEntries } from './get-entries';
import { EmptyEntryList, isEmptyEntryList } from './empty-entry-list';
import { Entry } from '../../type';
import { EntryList } from './entry-list';
import { NonEmptyEntryList, isNonEmptyEntryList } from './non-empty-entry-list';

const findPrevEntry = (
  entryList: EntryList,
  entryId: string
): Entry | null => {
  if (isEmptyEntryList(entryList)) {
    return null;
  } else if (isNonEmptyEntryList(entryList)) {
    const entries = getEntries(entryList);
    const index = entries.findIndex(({ id }) => id === entryId);
    if (index < 0) return null;
    if (index - 1 < 0) return null;
    return entries[index - 1];
  } else {
    throw new Error();
  }
};

export { EmptyEntryList, EntryList, NonEmptyEntryList, findPrevEntry };
