import { EntryViewer } from '../../type/entry-viewer';
import { Entry } from '../../type/entry';

const getCurrentPageEntries = ({
  allEntries,
  partialEntries,
  focusedEntryId
}: EntryViewer): Entry[] => {
  const es = allEntries === null ? partialEntries : allEntries;
  if (es.length === 0) return [];
  // assert(focusedEntryId !== null);
  const index = es.findIndex(({ id }) => id === focusedEntryId);
  // assert(index >= 0) && assert(index < entries.length);
  const s = Math.max(0, index - 4);
  const e = Math.max(0, index + 4 + 1);
  return es.slice(s, e);
};

export {
  getCurrentPageEntries
};
