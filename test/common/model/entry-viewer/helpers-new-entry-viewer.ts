import * as assert from 'power-assert';
import beater from 'beater';

import { newEntryViewer } from './helpers';

const { test } = beater();

test('/common/model/entry-viewer/helper-new-entry-viewer', () => {
  const data = newEntryViewer();
  assert(data.filteredEntries.length === 9);
  assert(data.filteredEntries[0].id === '2016-01-31');
  assert(data.focusedEntryId === '2016-01-31');
  assert(data.selectedEntryId === null);
});
