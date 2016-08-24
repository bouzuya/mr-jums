import * as assert from 'power-assert';
import beater from 'beater';

import { newEntryViewer } from './helpers';

const { test } = beater();

test('model > entry-viewer > selectPrev', () => {
  const data = newEntryViewer();

  const next30 = new Array(30).fill(0).reduce((e, _) => e.focusNext(), data);
  assert(next30.filteredEntries.length === 10);
  assert(next30.filteredEntries[0].id === '2016-01-10');
  assert(next30.focusedEntryId === '2016-01-01');
  assert(next30.selectedEntry === null);
  assert(next30.selectedEntryId === null);
  const data30 = next30;

  const prev0 = data30.select();
  assert(prev0.filteredEntries.length === 10);
  assert(prev0.filteredEntries[0].id === '2016-01-10');
  assert(prev0.focusedEntryId === '2016-01-01');
  assert(prev0.selectedEntry!.id === '2016-01-01');
  assert(prev0.selectedEntryId === '2016-01-01');

  const prev1 = prev0.selectPrev();
  assert(prev1.filteredEntries.length === 10);
  assert(prev1.filteredEntries[0].id === '2016-01-10');
  assert(prev1.focusedEntryId === '2016-01-02');
  assert(prev1.selectedEntry!.id === '2016-01-02');
  assert(prev1.selectedEntryId === '2016-01-02');

  const prev10 = new Array(10).fill(0).reduce((e, _) => e.selectPrev(), prev0);
  assert(prev10.filteredEntries.length === 10);
  assert(prev10.filteredEntries[0].id === '2016-01-11');
  assert(prev10.focusedEntryId === '2016-01-11');
  assert(prev10.selectedEntry!.id === '2016-01-11');
  assert(prev10.selectedEntryId === '2016-01-11');

  const prev30 = new Array(30).fill(0).reduce((e, _) => e.selectPrev(), prev0);
  assert(prev30.filteredEntries.length === 10);
  assert(prev30.filteredEntries[0].id === '2016-01-31');
  assert(prev30.focusedEntryId === '2016-01-31');
  assert(prev30.selectedEntry!.id === '2016-01-31');
  assert(prev30.selectedEntryId === '2016-01-31');

  const prev31 = new Array(31).fill(0).reduce((e, _) => e.selectPrev(), prev0);
  assert(prev31.filteredEntries.length === 10);
  assert(prev31.filteredEntries[0].id === '2016-01-31');
  assert(prev31.focusedEntryId === '2016-01-31');
  assert(prev31.selectedEntry!.id === '2016-01-31');
  assert(prev31.selectedEntryId === '2016-01-31');
});
