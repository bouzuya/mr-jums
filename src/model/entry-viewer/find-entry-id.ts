import { Entry } from '../../type';
import { findEntry } from './find-entry';

const findEntryId = (entries: Entry[], entryId: string): string | null => {
  const entry = findEntry(entries, entryId);
  return entry === null ? null : entry.id;
};

export { findEntryId };
