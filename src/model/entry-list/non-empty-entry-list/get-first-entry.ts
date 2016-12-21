import { Entry } from '../../../common/type';
import { NonEmptyEntryList } from './non-empty-entry-list';

const getFirstEntry = (nonEmptyEntryList: NonEmptyEntryList): Entry => {
  const { _entries } = nonEmptyEntryList;
  return _entries[0];
};

export { getFirstEntry };
