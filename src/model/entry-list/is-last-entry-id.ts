import { NonEmptyEntryList } from './non-empty-entry-list';
import { getLastEntry } from './get-last-entry';

const isLastEntryId = (
  nonEmptyEntryList: NonEmptyEntryList,
  entryId: string
): boolean => {
  return getLastEntry(nonEmptyEntryList).id === entryId;
};

export { isLastEntryId };
