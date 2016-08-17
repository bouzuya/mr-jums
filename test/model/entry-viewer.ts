import * as assert from 'power-assert';
import beater from 'beater';

import { EntryViewer } from '../../src/model/entry-viewer';

const { test } = beater();

test('focusNext', () => {
  const entries = new Array(31).fill(0).map((_, i) => 31 - i).map((n) => {
    const s = n < 10 ? '0' + n : n.toString(10);
    return { id: `2016-01-${s}`, title: `Entry ${s}`, body: `Entry Body ${s}` };
  });
  assert(entries.length === 31);
  assert(entries[0].id === '2016-01-31');

  const entryViewer = EntryViewer.create(entries);
  assert.deepEqual(entryViewer.filteredEntries.length, 10);
  assert(entryViewer.filteredEntries[0].id === '2016-01-31');
  assert(entryViewer.focusedEntryId === '2016-01-31');
  assert(entryViewer.selectedEntry === null);
  assert(entryViewer.selectedEntryId === null);

  const next1 = entryViewer.focusNext();
  assert.deepEqual(next1.filteredEntries.length, 10);
  assert(next1.filteredEntries[0].id === '2016-01-31');
  assert(next1.focusedEntryId === '2016-01-30');
  assert(next1.selectedEntry === null);
  assert(next1.selectedEntryId === null);
});
