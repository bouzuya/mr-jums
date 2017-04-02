import * as assert from 'power-assert';
import beater from 'beater';

import { route } from '../../src/server/route';

const { test } = beater();

const category = 'route > ';

test(category + 'entry-list', () => {
  const result = route('/');
  assert(result.name === 'entry-list');
  assert.deepEqual(result.params, {});
});

test(category + 'entry-detail', () => {
  const result = route('/2006/01/02/');
  assert(result.name === 'entry-detail');
  assert.deepEqual(result.params, {
    year: '2006',
    month: '01',
    date: '02'
  });
});
