import { EntryViewerImpl } from './entry-viewer-impl';
import { EntryViewer } from '../../type';
import {
  getOffsetEntryId,
  hasEntryId,
  hasEntryIdInCurrentPage,
  isEmptyPagedEntryList,
  offset
} from '../paged-entry-list';

const focus = (
  entryViewer: EntryViewer,
  entryId: string
): EntryViewer => {
  const { _pagedEntryList: pagedEntryList } = entryViewer;
  if (isEmptyPagedEntryList(pagedEntryList)) return entryViewer;
  if (hasEntryId(pagedEntryList, entryId) === false) return entryViewer;
  const newOffsetEntryId = hasEntryIdInCurrentPage(pagedEntryList, entryId)
    ? getOffsetEntryId(pagedEntryList) : entryId;
  return new EntryViewerImpl(
    offset(pagedEntryList, newOffsetEntryId),
    entryId,
    entryViewer.selectedEntryId
  );
};

export { focus };
