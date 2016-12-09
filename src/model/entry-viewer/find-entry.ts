import { Entry } from '../../type';

const findEntry = (entries: Entry[], entryId: string): Entry | null => {
  const entry = entries.find(({ id }) => id === entryId);
  return typeof entry === 'undefined' ? null : entry;
};

export { findEntry };
