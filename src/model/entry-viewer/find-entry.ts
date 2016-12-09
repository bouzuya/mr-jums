import { Entry } from '../../type';

const findEntry = (entries: Entry[], entryId: string): Entry | undefined => {
  return entries.find(({ id }) => id === entryId);
};

export { findEntry };
