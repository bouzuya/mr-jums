import * as assert from 'power-assert';
import beater from 'beater';

import { Entry } from '../../../src/common/type/entry';
import {
  createEntryList,
  getEntries,
  getFirstEntry,
  getLastEntry,
  isEmptyEntryList,
  isFirstEntryId,
  isLastEntryId,
  isNonEmptyEntryList
} from '../../../src/model/entry-list';

const { test } = beater();

const category = 'model > entry-list > ';

test(category + 'EmptyEntryList', () => {
  const empty = createEntryList([]);
  if (isEmptyEntryList(empty)) {
    assert(getEntries(empty).length === 0); // []
  } else {
    assert.fail();
  }
});

test(category + 'NonEmptyEntryList ([entry1])', () => {
  const entry1: Entry = { id: '2016-01-01', title: 'title1' };
  const entryList = createEntryList([entry1]);
  if (isNonEmptyEntryList(entryList)) {
    assert(getEntries(entryList).length === 1); // [entry1]
    assert.deepEqual(getEntries(entryList)[0], entry1);
    assert.deepEqual(getFirstEntry(entryList), entry1);
    assert.deepEqual(getLastEntry(entryList), entry1);
    assert(isFirstEntryId(entryList, entry1.id) === true);
    assert(isLastEntryId(entryList, entry1.id) === true);
  } else {
    assert.fail();
  }
});

test(category + 'NonEmptyEntryList ([entry1, entry2])', () => {
  const entry1: Entry = { id: '2016-01-02', title: 'title2' };
  const entry2: Entry = { id: '2016-01-01', title: 'title1' };
  const entryList = createEntryList([entry1, entry2]);
  if (isNonEmptyEntryList(entryList)) {
    assert(getEntries(entryList).length === 2); // [entry1]
    assert.deepEqual(getEntries(entryList)[0], entry1);
    assert.deepEqual(getEntries(entryList)[1], entry2);
    assert.deepEqual(getFirstEntry(entryList), entry1);
    assert.deepEqual(getLastEntry(entryList), entry2);
    assert(isFirstEntryId(entryList, entry1.id) === true);
    assert(isFirstEntryId(entryList, entry2.id) === false);
    assert(isLastEntryId(entryList, entry1.id) === false);
    assert(isLastEntryId(entryList, entry2.id) === true);
  } else {
    assert.fail();
  }
});
