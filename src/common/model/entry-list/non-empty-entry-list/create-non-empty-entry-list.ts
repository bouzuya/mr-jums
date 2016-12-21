import { Entry } from '../../../type/entry';
import { NonEmptyEntryList } from './non-empty-entry-list';

const createNonEmptyEntryList = (entries: Entry[]): NonEmptyEntryList => {
  return {
    _type: 'non-empty-entry-list',
    _entries: entries
  };
};

export { createNonEmptyEntryList };
