import * as assert from 'power-assert';
import beater from 'beater';

import {
  createPagedEntryList,
  getAllEntries,
  getCurrentPageEntries
} from '../../../../src/common/model/paged-entry-list';

const { test } = beater();

const category = '/common/model/paged-entry-list ';

test(category + 'TODO', () => {
  assert(createPagedEntryList);
  assert(getAllEntries);
  assert(getCurrentPageEntries);
});
