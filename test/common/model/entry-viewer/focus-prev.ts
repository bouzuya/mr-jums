import * as assert from 'power-assert';
import beater from 'beater';

import { newEntryViewer } from './helpers';
import {
  focusNext, focusPrev, getCurrentPageEntries
} from '../../../../src/common/model/entry-viewer';

const { test } = beater();

test('/common/model/entry-viewer/focus-prev', () => {
  const data = newEntryViewer();

  const next30 = new Array(30).fill(0).reduce((e, _) => focusNext(e), data);
  assert(getCurrentPageEntries(next30).length === 9);
  assert(getCurrentPageEntries(next30)[0].id === '2016-01-09');
  assert(next30.focusedEntryId === '2016-01-01');
  assert(next30.selectedEntryId === null);

  const prev1 = focusPrev(next30);
  assert(getCurrentPageEntries(prev1).length === 9);
  assert(getCurrentPageEntries(prev1)[0].id === '2016-01-09');
  assert(prev1.focusedEntryId === '2016-01-02');
  assert(prev1.selectedEntryId === null);

  const prev10 = new Array(10).fill(0).reduce((e, _) => focusPrev(e), next30);
  assert(getCurrentPageEntries(prev10).length === 9);
  assert(getCurrentPageEntries(prev10)[0].id === '2016-01-11');
  assert(prev10.focusedEntryId === '2016-01-11');
  assert(prev10.selectedEntryId === null);

  const prev30 = new Array(30).fill(0).reduce((e, _) => focusPrev(e), next30);
  assert(getCurrentPageEntries(prev30).length === 9);
  assert(getCurrentPageEntries(prev30)[0].id === '2016-01-31');
  assert(prev30.focusedEntryId === '2016-01-31');
  assert(prev30.selectedEntryId === null);

  const prev31 = new Array(31).fill(0).reduce((e, _) => focusPrev(e), next30);
  assert(getCurrentPageEntries(prev31).length === 9);
  assert(getCurrentPageEntries(prev31)[0].id === '2016-01-31');
  assert(prev31.focusedEntryId === '2016-01-31');
  assert(prev31.selectedEntryId === null);
});
