import { Entry } from '../../type/entry';
import { EntryViewer } from '../../type/entry-viewer';
import { createEntryList } from '../entry-list';
import { createPagedEntryList } from '../paged-entry-list';
import { createImpl } from './create-impl';
import { focus } from './focus';
import { focusNext } from './focus-next';
import { focusPrev } from './focus-prev';
import { select } from './select';
import { selectNext } from './select-next';
import { selectPrev } from './select-prev';

const create = (entries: Entry[]): EntryViewer => {
  return createImpl(
    createPagedEntryList(
      createEntryList(entries),
      10,
      (entries.length > 0 ? entries[0].id : null)
    ),
    (entries.length > 0 ? entries[0].id : null),
    null
  );
};

export { create, focus, focusNext, focusPrev, select, selectNext, selectPrev };
