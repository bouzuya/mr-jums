import * as assert from 'power-assert';
import beater from 'beater';

import {
  create, getCurrentPageEntries
} from '../../../../src/common/model/entry-viewer';

const { test } = beater();

test('/common/model/entry-viewer/empty', () => {
  const empty = create([]);
  assert(getCurrentPageEntries(empty).length === 0);
  assert(empty.focusedEntryId === null);
  assert(empty.selectedEntryId === null);
});
