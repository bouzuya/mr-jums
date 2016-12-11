import { EntryViewerImpl } from './entry-viewer-impl';
import { EntryViewer } from '../../type';
import {
  hasEntryId,
  isEmptyPagedEntryList,
} from '../paged-entry-list';
import { focus } from './focus';

const selectAndFocus = (
  entryViewer: EntryViewer,
  entryId?: string
): EntryViewer => {
  const { _pagedEntryList: pagedEntryList } = entryViewer;
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  const id = typeof entryId === 'undefined'
    ? entryViewer.focusedEntryId : entryId;
  if (id === null) return entryViewer;
  if (hasEntryId(pagedEntryList, id) === false) return entryViewer;
  return focus(new EntryViewerImpl(
    pagedEntryList,
    entryViewer.focusedEntryId,
    id
  ), id);
};

export { selectAndFocus as select };
