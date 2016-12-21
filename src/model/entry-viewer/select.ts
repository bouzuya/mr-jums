import { createImpl } from './create-impl';
import { EntryViewer } from '../../common/type/entry-viewer';
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
  return focus(createImpl(
    pagedEntryList,
    entryViewer.focusedEntryId,
    id
  ), id);
};

export { selectAndFocus as select };
