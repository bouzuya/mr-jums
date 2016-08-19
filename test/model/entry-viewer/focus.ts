import * as assert from 'power-assert';
import beater from 'beater';

import { newEntryViewer } from './helpers';

const { test } = beater();

test('model > entry-viewer > focus', () => {
  const data = newEntryViewer();

  const focus20160131 = data.focus('2016-01-31');
  assert(focus20160131.filteredEntries.length === 10);
  assert(focus20160131.filteredEntries[0].id === '2016-01-31');
  assert(focus20160131.focusedEntryId === '2016-01-31');
  assert(focus20160131.selectedEntry === null);
  assert(focus20160131.selectedEntryId === null);

  const focus20160121 = data.focus('2016-01-21');
  assert(focus20160121.filteredEntries.length === 10);
  assert(focus20160121.filteredEntries[0].id === '2016-01-21');
  assert(focus20160121.focusedEntryId === '2016-01-21');
  assert(focus20160121.selectedEntry === null);
  assert(focus20160121.selectedEntryId === null);

  const focus20160101 = data.focus('2016-01-01');
  assert(focus20160101.filteredEntries.length === 1);
  assert(focus20160101.filteredEntries[0].id === '2016-01-01');
  assert(focus20160101.focusedEntryId === '2016-01-01');
  assert(focus20160101.selectedEntry === null);
  assert(focus20160101.selectedEntryId === null);

  const focus19700101 = data.focus('1970-01-01'); // not found
  assert(focus19700101.filteredEntries.length === 10);
  assert(focus19700101.filteredEntries[0].id === '2016-01-31');
  assert(focus19700101.focusedEntryId === '2016-01-31');
  assert(focus19700101.selectedEntry === null);
  assert(focus19700101.selectedEntryId === null);
});
