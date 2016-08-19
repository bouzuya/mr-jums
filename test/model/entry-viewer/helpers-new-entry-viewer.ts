import * as assert from 'power-assert';
import beater from 'beater';

import { newEntryViewer } from './helpers';

const { test } = beater();

test('model > entry-viewer > helper: newEntryViewer', () => {
  const data = newEntryViewer();
  assert(data.filteredEntries.length === 10);
  assert(data.filteredEntries[0].id === '2016-01-31');
  assert(data.focusedEntryId === '2016-01-31');
  assert(data.selectedEntry === null);
  assert(data.selectedEntryId === null);
});
