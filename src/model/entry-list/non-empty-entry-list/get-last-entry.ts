import { Entry } from '../../../common/type/entry';
import { NonEmptyEntryList } from './non-empty-entry-list';

const getLastEntry = (nonEmptyEntryList: NonEmptyEntryList): Entry => {
  const { _entries } = nonEmptyEntryList;
  return _entries[_entries.length - 1];
};

export { getLastEntry };
