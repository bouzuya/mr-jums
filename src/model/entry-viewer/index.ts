import { Entry, EntryViewer } from '../../type';
import { createEntryList } from '../entry-list';
import { createPagedEntryList } from '../paged-entry-list';
import { EntryViewerImpl } from './entry-viewer-impl';
import { focus } from './focus';
import { focusNext } from './focus-next';
import { select } from './select';

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

export { create, focus, focusNext, select };
