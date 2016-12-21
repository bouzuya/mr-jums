import * as assert from 'power-assert';
import beater from 'beater';

import { newEntryViewer } from './helpers';
import {
  focusNext, focusPrev
} from '../../../../src/common/model/entry-viewer';

const { test } = beater();

test('model > entry-viewer > focusPrev', () => {
  const data = newEntryViewer();

  const next30 = new Array(30).fill(0).reduce((e, _) => focusNext(e), data);
  assert(next30.filteredEntries.length === 10);
  assert(next30.filteredEntries[0].id === '2016-01-10');
  assert(next30.focusedEntryId === '2016-01-01');
  assert(next30.selectedEntry === null);
  assert(next30.selectedEntryId === null);

  const prev1 = focusPrev(next30);
  assert(prev1.filteredEntries.length === 10);
  assert(prev1.filteredEntries[0].id === '2016-01-10');
  assert(prev1.focusedEntryId === '2016-01-02');
  assert(prev1.selectedEntry === null);
  assert(prev1.selectedEntryId === null);

  const prev10 = new Array(10).fill(0).reduce((e, _) => focusPrev(e), next30);
  assert(prev10.filteredEntries.length === 10);
  assert(prev10.filteredEntries[0].id === '2016-01-11');
  assert(prev10.focusedEntryId === '2016-01-11');
  assert(prev10.selectedEntry === null);
  assert(prev10.selectedEntryId === null);

  const prev30 = new Array(30).fill(0).reduce((e, _) => focusPrev(e), next30);
  assert(prev30.filteredEntries.length === 10);
  assert(prev30.filteredEntries[0].id === '2016-01-31');
  assert(prev30.focusedEntryId === '2016-01-31');
  assert(prev30.selectedEntry === null);
  assert(prev30.selectedEntryId === null);

  const prev31 = new Array(31).fill(0).reduce((e, _) => focusPrev(e), next30);
  assert(prev31.filteredEntries.length === 10);
  assert(prev31.filteredEntries[0].id === '2016-01-31');
  assert(prev31.focusedEntryId === '2016-01-31');
  assert(prev31.selectedEntry === null);
  assert(prev31.selectedEntryId === null);
});
