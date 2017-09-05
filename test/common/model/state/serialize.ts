import { Test, test } from 'beater';
import * as assert from 'power-assert';
import { create } from '../../../../src/common/model/state/create';
import { serialize } from '../../../../src/common/model/state/serialize';
import { Entry } from '../../../../src/common/type/entry';
import { EntryDetail } from '../../../../src/common/type/entry-detail';
import { State } from '../../../../src/common/type/state';

const category = '/common/model/state/serialize ';
const tests1: Test[] = [
  test(category + '0 entry', () => {
    const state: State = create({
      entries: [],
      focus: null
    });
    const serialized = serialize(state);
    assert.deepEqual(
      JSON.parse(serialized),
      {
        focusedEntryId: null,
        partialEntries: [],
        selectedEntryDetail: null
      }
    );
  }),
  test(category + '1 entry', () => {
    const entries: Entry[] = [
      { id: '2017-01-01', title: 'title1' }
    ];
    const state: State = create({
      entries,
      focus: entries[0].id
    });
    const serialized: string = serialize(state);
    assert.deepEqual(
      JSON.parse(serialized),
      {
        focusedEntryId: entries[0].id,
        partialEntries: entries,
        selectedEntryDetail: null
      }
    );
  }),
  test(category + '1 entry (selected)', () => {
    const entries: Entry[] = [
      { id: '2017-01-01', title: 'title1' }
    ];
    const entry: EntryDetail = Object.assign(
      {},
      entries[0],
      {
        description: 'description1',
        html: 'html1',
        minutes: 1,
        pubdate: '2017-01-01T00:00:00Z',
        tags: ['misc']
      });
    const state: State = create({
      entries,
      entry,
      focus: entries[0].id
    });
    const serialized: string = serialize(state);
    assert.deepEqual(
      JSON.parse(serialized),
      {
        focusedEntryId: entries[0].id,
        partialEntries: entries,
        selectedEntryDetail: entry
      }
    );
  }),
  test(category + '2 entries', () => {
    const entries: Entry[] = [
      { id: '2017-01-02', title: 'title2' },
      { id: '2017-01-01', title: 'title1' }
    ];
    const state: State = create({
      entries,
      focus: entries[0].id
    });
    const serialized: string = serialize(state);
    assert.deepEqual(
      JSON.parse(serialized),
      {
        focusedEntryId: entries[0].id,
        partialEntries: entries,
        selectedEntryDetail: null
      }
    );
  }),
  test(category + '2 entries (selected)', () => {
    const entries: Entry[] = [
      { id: '2017-01-02', title: 'title2' },
      { id: '2017-01-01', title: 'title1' }
    ];
    const entry: EntryDetail = Object.assign(
      {},
      entries[0],
      {
        description: 'description1',
        html: 'html1',
        minutes: 1,
        pubdate: '2017-01-01T00:00:00Z',
        tags: ['misc']
      });
    const state: State = create({
      entries,
      entry,
      focus: entries[0].id
    });
    const serialized: string = serialize(state);
    assert.deepEqual(
      JSON.parse(serialized),
      {
        focusedEntryId: entries[0].id,
        partialEntries: entries,
        selectedEntryDetail: entry
      }
    );
  })
];

export { tests1 as tests };
