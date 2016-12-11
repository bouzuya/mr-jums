import { Entry } from '../../type';
import { EmptyEntryList } from './empty-entry-list';
import { NonEmptyEntryList } from './non-empty-entry-list';
import { EntryList } from './entry-list';
import { getEntries } from './get-entries';

const currentPageEntries = (
  allEntries: Entry[], offsetEntryId: string | null, maxCount: number
): Entry[] => {
  // assert(entries are ordered by desc)
  if (offsetEntryId === null) return [];
  if (maxCount <= 0) return [];
  return allEntries
    .filter(({ id }) => id <= offsetEntryId)
    .filter((_, index) => index < maxCount);
};

const getPageEntries = (
  entryList: EntryList,
  offsetEntryId: string,
  maxCount: number
): Entry[] => {
  return currentPageEntries(getEntries(entryList), offsetEntryId, maxCount);
};

export { EmptyEntryList, EntryList, NonEmptyEntryList, getPageEntries };
