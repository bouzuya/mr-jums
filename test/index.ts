import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import beater from 'beater';

import { add } from '../src/';

const { test } = beater();

test('add', () => {
  assert(add(1, 2) === 3);
  assert(sinon);
  assert(proxyquire);
});
