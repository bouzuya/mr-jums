import { Entry } from '../../type/entry';

const getNextEntry = (
  entries: Entry[],
  entryId: string | null
): Entry | null => {
  if (entryId === null) return null; // entry id not found
  if (entries.length === 0) return null;
  const index = entries.findIndex(({ id }) => id === entryId);
  if (index === -1) return null; // entry id not found
  if (index === entries.length - 1) return null; // last entry
  return entries[index + 1];
};

export { getNextEntry };
