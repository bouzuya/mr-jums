import * as assert from 'power-assert';
import beater from 'beater';

import { newEntryViewer } from './helpers';
import { select } from '../../../src/model/entry-viewer/select';
import { selectNext } from '../../../src/model/entry-viewer/select-next';

const { test } = beater();

test('model > entry-viewer > selectNext', () => {
  const data = newEntryViewer();

  const next0 = select(data);
  assert(next0.filteredEntries.length === 10);
  assert(next0.filteredEntries[0].id === '2016-01-31');
  assert(next0.focusedEntryId === '2016-01-31');
  assert(next0.selectedEntry!.id === '2016-01-31');
  assert(next0.selectedEntryId === '2016-01-31');

  const next1 = selectNext(next0);
  assert(next1.filteredEntries.length === 10);
  assert(next1.filteredEntries[0].id === '2016-01-31');
  assert(next1.focusedEntryId === '2016-01-30');
  assert(next1.selectedEntry!.id === '2016-01-30');
  assert(next1.selectedEntryId === '2016-01-30');

  const next10 = new Array(10).fill(0).reduce((e, _) => selectNext(e), next0);
  assert(next10.filteredEntries.length === 10);
  assert(next10.filteredEntries[0].id === '2016-01-30');
  assert(next10.focusedEntryId === '2016-01-21');
  assert(next10.selectedEntry!.id === '2016-01-21');
  assert(next10.selectedEntryId === '2016-01-21');

  const next30 = new Array(30).fill(0).reduce((e, _) => selectNext(e), next0);
  assert(next30.filteredEntries.length === 10);
  assert(next30.filteredEntries[0].id === '2016-01-10');
  assert(next30.focusedEntryId === '2016-01-01');
  assert(next30.selectedEntry!.id === '2016-01-01');
  assert(next30.selectedEntryId === '2016-01-01');

  const next31 = new Array(31).fill(0).reduce((e, _) => selectNext(e), next0);
  assert(next31.filteredEntries.length === 10);
  assert(next31.filteredEntries[0].id === '2016-01-10');
  assert(next31.focusedEntryId === '2016-01-01');
  assert(next31.selectedEntry!.id === '2016-01-01');
  assert(next31.selectedEntryId === '2016-01-01');
});
