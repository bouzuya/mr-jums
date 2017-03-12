import { EntryViewer } from '../../type/entry-viewer';
import { Entry } from '../../type/entry';

const getCurrentPageEntries = ({
  entries,
  focusedEntryId
}: EntryViewer): Entry[] => {
  if (entries.length === 0) return [];
  // assert(focusedEntryId !== null);
  const index = entries.findIndex(({ id }) => id === focusedEntryId);
  // assert(index >= 0) && assert(index < entries.length);
  const s = Math.max(0, index - 4);
  const e = Math.max(0, index + 4 + 1);
  return entries.slice(s, e);
};

export {
  getCurrentPageEntries
};
