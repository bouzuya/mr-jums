import { Entry } from '../../type/entry';

const getPrevEntry = (
  entries: Entry[],
  entryId: string | null
): Entry | null => {
  if (entryId === null) return null; // entry id not found
  if (entries.length === 0) return null;
  const index = entries.findIndex(({ id }) => id === entryId);
  if (index === -1) return null; // entry id not found
  if (index === 0) return null; // first entry
  return entries[index - 1];
};

export { getPrevEntry };
