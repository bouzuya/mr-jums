import { Entry } from '../../type/entry';

const getCurrentEntry = (
  entries: Entry[],
  entryId: string | null
): Entry | null => {
  if (entryId === null) return null;
  if (entries.length === 0) return null;
  const found = entries.find(({ id }) => id === entryId);
  return typeof found === 'undefined' ? null : found;
};

export { getCurrentEntry };
