import { Test, test } from 'beater';
import * as assert from 'power-assert';

import { newEntryViewer } from './helpers';
import {
  getCurrentPageEntries
} from '../../../../src/common/model/entry-viewer';

const tests1: Test[] = [
  test('/common/model/entry-viewer/helper-new-entry-viewer', () => {
    const data = newEntryViewer();
    assert(getCurrentPageEntries(data).length === 5);
    assert(getCurrentPageEntries(data)[0].id === '2016-01-31');
    assert(data.focusedEntryId === '2016-01-31');
    assert(data.selectedEntryId === null);
  })
];

export { tests1 as tests };
