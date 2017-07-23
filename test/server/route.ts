import { Test, test } from 'beater';
import * as assert from 'power-assert';

import { route } from '../../src/server/route';

const category = 'route > ';

const tests1: Test[] = [
  test(category + 'entry-list', () => {
    const result = route('/');
    assert(result.name === 'entry-list');
    assert.deepEqual(result.params, {});
  }),

  test(category + 'entry-detail', () => {
    const result = route('/2006/01/02/');
    assert(result.name === 'entry-detail');
    assert.deepEqual(result.params, {
      year: '2006',
      month: '01',
      date: '02'
    });
  })
];

export { tests1 as tests };
