import { createImpl } from './create-impl';
import { EntryViewer } from '../../common/type';
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
  return createImpl(
    offset(pagedEntryList, newOffsetEntryId),
    entryId,
    entryViewer.selectedEntryId
  );
};

export { focus };
