import { Entry } from '../../type';
import { findEntry } from './find-entry';

const findEntryId = (entries: Entry[], entryId: string): string | undefined => {
  const entry = findEntry(entries, entryId);
  return typeof entry === 'undefined' ? entry : entry.id;
};

export { findEntryId };
