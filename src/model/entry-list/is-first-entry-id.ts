import { NonEmptyEntryList } from './non-empty-entry-list';
import { getFirstEntry } from './get-first-entry';

const isFirstEntryId = (
  nonEmptyEntryList: NonEmptyEntryList,
  entryId: string
): boolean => {
  return getFirstEntry(nonEmptyEntryList).id === entryId;
};

export { isFirstEntryId };
