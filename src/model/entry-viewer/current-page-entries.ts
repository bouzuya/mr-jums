import { Entry } from '../../type';

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

export { currentPageEntries };
