import { Entry } from '../../type';
import { currentPageEntries } from '../entry-viewer/current-page-entries';
import { EmptyEntryList } from './empty-entry-list';
import { NonEmptyEntryList } from './non-empty-entry-list';
import { EntryList } from './entry-list';
import { getEntries } from './get-entries';

const getPageEntries = (
  entryList: EntryList,
  offsetEntryId: string,
  maxCount: number
): Entry[] => {
  return currentPageEntries(getEntries(entryList), offsetEntryId, maxCount);
};

export { EmptyEntryList, EntryList, NonEmptyEntryList, getPageEntries };
