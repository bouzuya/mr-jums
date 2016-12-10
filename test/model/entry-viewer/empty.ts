import * as assert from 'power-assert';
import beater from 'beater';

import { create } from '../../../src/model/entry-viewer';

const { test } = beater();

test('model > entry-viewer > empty', () => {
  const empty = create([]);
  assert(empty.filteredEntries.length === 0);
  assert(empty.focusedEntryId === null);
  assert(empty.selectedEntry === null);
  assert(empty.selectedEntryId === null);
});
