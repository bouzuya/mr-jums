import * as assert from 'power-assert';
import beater from 'beater';

import { newEntryViewer } from './helpers';
import { focusNext } from '../../../src/model/entry-viewer';

const { test } = beater();

test('model > entry-viewer > focusNext', () => {
  const data = newEntryViewer();

  const next1 = focusNext(data);
  assert(next1.filteredEntries.length === 10);
  assert(next1.filteredEntries[0].id === '2016-01-31');
  assert(next1.focusedEntryId === '2016-01-30');
  assert(next1.selectedEntry === null);
  assert(next1.selectedEntryId === null);

  const next10 = new Array(10).fill(0).reduce((e, _) => e.focusNext(), data);
  assert(next10.filteredEntries.length === 10);
  assert(next10.filteredEntries[0].id === '2016-01-30');
  assert(next10.focusedEntryId === '2016-01-21');
  assert(next10.selectedEntry === null);
  assert(next10.selectedEntryId === null);

  const next30 = new Array(30).fill(0).reduce((e, _) => e.focusNext(), data);
  assert(next30.filteredEntries.length === 10);
  assert(next30.filteredEntries[0].id === '2016-01-10');
  assert(next30.focusedEntryId === '2016-01-01');
  assert(next30.selectedEntry === null);
  assert(next30.selectedEntryId === null);

  const next31 = new Array(31).fill(0).reduce((e, _) => e.focusNext(), data);
  assert(next31.filteredEntries.length === 10);
  assert(next31.filteredEntries[0].id === '2016-01-10');
  assert(next31.focusedEntryId === '2016-01-01');
  assert(next31.selectedEntry === null);
  assert(next31.selectedEntryId === null);
});
