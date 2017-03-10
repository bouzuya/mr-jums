import * as assert from 'power-assert';
import beater from 'beater';

import { newEntryViewer } from './helpers';
import {
  getCurrentPageEntries
} from '../../../../src/common/model/entry-viewer';

const { test } = beater();

test('/common/model/entry-viewer/helper-new-entry-viewer', () => {
  const data = newEntryViewer();
  assert(getCurrentPageEntries(data).length === 9);
  assert(getCurrentPageEntries(data)[0].id === '2016-01-31');
  assert(data.focusedEntryId === '2016-01-31');
  assert(data.selectedEntryId === null);
});
