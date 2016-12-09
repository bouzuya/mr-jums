import { Entry } from '../../type';

const hasEntry = (entries: Entry[], entryId: string): boolean => {
  return entries.some(({ id }) => id === entryId);
};

export { hasEntry };
