import * as assert from 'power-assert';
import beater from 'beater';

import { findEntryId } from '../../../src/model/entry-viewer/find-entry-id';

const { test } = beater();

const category = 'model > entry-viewer > find-entry-id > ';

test(category + '*', () => {
  // TODO
  assert(findEntryId);
});
