import { EntryViewer } from '../../type/entry-viewer';
import {
  getCurrentPageEntries as getCurrentPageEntries_,
} from '../paged-entry-list';
import { Entry } from '../../type/entry';

const getCurrentPageEntries = ({
  _pagedEntryList: pagedEntryList
}: EntryViewer): Entry[] => {
  return getCurrentPageEntries_(pagedEntryList);
};

export {
  getCurrentPageEntries
};
