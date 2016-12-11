import { Entry, EntryViewer } from '../../type';
import { createEntryList } from '../entry-list';
import { createPagedEntryList } from '../paged-entry-list';
import { EntryViewerImpl } from './entry-viewer-impl';

const create = (entries: Entry[]): EntryViewer => {
  return new EntryViewerImpl(
    createPagedEntryList(
      createEntryList(entries),
      10,
      (entries.length > 0 ? entries[0].id : null)
    ),
    (entries.length > 0 ? entries[0].id : null),
    null
  );
};

export { create };
