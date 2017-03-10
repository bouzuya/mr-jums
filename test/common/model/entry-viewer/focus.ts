import * as assert from 'power-assert';
import beater from 'beater';

import { newEntryViewer } from './helpers';
import {
  focus, getCurrentPageEntries
} from '../../../../src/common/model/entry-viewer';

const { test } = beater();

test('/common/model/entry-viewer/focus', () => {
  const data = newEntryViewer();

  const focus20160131 = focus(data, '2016-01-31');
  assert(getCurrentPageEntries(focus20160131).length === 9);
  assert(getCurrentPageEntries(focus20160131)[0].id === '2016-01-31');
  assert(focus20160131.focusedEntryId === '2016-01-31');
  assert(focus20160131.selectedEntryId === null);

  const focus20160121 = focus(data, '2016-01-21');
  assert(getCurrentPageEntries(focus20160121).length === 9);
  assert(getCurrentPageEntries(focus20160121)[0].id === '2016-01-21');
  assert(focus20160121.focusedEntryId === '2016-01-21');
  assert(focus20160121.selectedEntryId === null);

  const focus20160101 = focus(data, '2016-01-01');
  assert(getCurrentPageEntries(focus20160101).length === 1);
  assert(getCurrentPageEntries(focus20160101)[0].id === '2016-01-01');
  assert(focus20160101.focusedEntryId === '2016-01-01');
  assert(focus20160101.selectedEntryId === null);

  const focus19700101 = focus(data, '1970-01-01'); // not found
  assert(getCurrentPageEntries(focus19700101).length === 9);
  assert(getCurrentPageEntries(focus19700101)[0].id === '2016-01-31');
  assert(focus19700101.focusedEntryId === '2016-01-31');
  assert(focus19700101.selectedEntryId === null);
});
