import { Entry } from '../../type/entry';
import { EntryViewer } from '../../type/entry-viewer';
import { createImpl } from './create-impl';
import { focusNext } from './focus-next';
import { focusPrev } from './focus-prev';
import { getCurrentPageEntries } from './get-current-page-entries';
import { select } from './select';
import { selectNext } from './select-next';
import { selectPrev } from './select-prev';

const create = (entries: Entry[]): EntryViewer => {
  return createImpl(
    entries,
    (entries.length > 0 ? entries[0].id : null),
    null
  );
};

export {
  create,
  focusNext,
  focusPrev,
  getCurrentPageEntries,
  select,
  selectNext,
  selectPrev
};
