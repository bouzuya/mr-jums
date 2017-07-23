import { Test, test } from 'beater';
import * as assert from 'power-assert';

import {
  create, getCurrentPageEntries
} from '../../../../src/common/model/entry-viewer';

const tests1: Test[] = [
  test('/common/model/entry-viewer/empty', () => {
    const empty = create([]);
    assert(getCurrentPageEntries(empty).length === 0);
    assert(empty.focusedEntryId === null);
    assert(empty.selectedEntryId === null);
  })
];

export { tests1 as tests };

