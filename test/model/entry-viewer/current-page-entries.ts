import * as assert from 'power-assert';
import beater from 'beater';

import { Entry } from '../../../src/type';
import {
  currentPageEntries
} from '../../../src/model/entry-viewer/current-page-entries';

const { test } = beater();

const category = 'model > entry-viewer > current-page-entries > ';

test(category + '*', () => {
  const entries: Entry[] = [
    { id: '2016-01-03', title: 'title3' },
    { id: '2016-01-02', title: 'title2' },
    { id: '2016-01-01', title: 'title1' }
  ];
  const f = currentPageEntries;
  assert(f([], '2016-01-01', 1).length === 0);
  assert(f(entries, null, 1).length === 0);
  assert(f(entries, '2016-01-01', -1).length === 0);
  assert(f(entries, '2016-01-03', 1).length === 1);
  assert(f(entries, '2016-01-03', 1)[0].id === '2016-01-03');
  assert(f(entries, '2016-01-03', 2).length === 2);
  assert(f(entries, '2016-01-03', 2)[0].id === '2016-01-03');
  assert(f(entries, '2016-01-03', 2)[1].id === '2016-01-02');
  assert(f(entries, '2016-01-03', 3).length === 3);
  assert(f(entries, '2016-01-03', 3)[0].id === '2016-01-03');
  assert(f(entries, '2016-01-03', 3)[1].id === '2016-01-02');
  assert(f(entries, '2016-01-03', 3)[2].id === '2016-01-01');
  assert(f(entries, '2016-01-03', 4).length === 3);
  assert(f(entries, '2016-01-03', 4)[0].id === '2016-01-03');
  assert(f(entries, '2016-01-03', 4)[1].id === '2016-01-02');
  assert(f(entries, '2016-01-03', 4)[2].id === '2016-01-01');
  assert(f(entries, '2016-01-02', 1).length === 1);
  assert(f(entries, '2016-01-02', 1)[0].id === '2016-01-02');
  assert(f(entries, '2016-01-02', 2).length === 2);
  assert(f(entries, '2016-01-02', 2)[0].id === '2016-01-02');
  assert(f(entries, '2016-01-02', 2)[1].id === '2016-01-01');
});
