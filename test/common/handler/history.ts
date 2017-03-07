import * as assert from 'power-assert';
import beater from 'beater';
import xs, { Listener, Stream } from 'xstream';

import { StateEvent } from '../../../src/common/event/state-event';
import { model } from '../../../src/common/handler/history';

const { test } = beater();

const category = 'handler > history > ';

const toPromise = <T>(s: Stream<T>): Promise<T[]> => {
  return new Promise<T[]>((resolve, reject) => {
    const values: T[] = [];
    const listener: Listener<T> = {
      complete() {
        s.removeListener(listener);
        resolve(values);
      },
      error(e) {
        s.removeListener(listener);
        reject(e);
      },
      next(value) {
        values.push(value);
      }
    };
    s.addListener(listener);
  });
};

test(category + 'menu: true, entry: null', () => {
  const message$ = xs.of(<StateEvent>{
    type: 'state',
    state: {
      entry: null,
      menu: true
    }
  });
  return toPromise(model(message$)).then((values) => {
    assert(values.length === 1);
    const value = values[0];
    if (value.type === 'history-pushed') {
      const { type, path, title } = value;
      assert(type === 'history-pushed');
      assert(path === '/');
      assert(title === 'blog.bouzuya.net');
    } else {
      assert.fail();
    }
  });
});

test(category + 'menu: true, entry: { id, title }', () => {
  const message$ = xs.of(<StateEvent>{
    type: 'state',
    state: {
      entry: { id: '2006-01-02', title: 'title1' },
      menu: true
    }
  });
  return toPromise(model(message$)).then((values) => {
    assert(values.length === 1);
    const value = values[0]
    if (value.type === 'history-pushed') {
      const { type, path, title } = value;
      assert(type === 'history-pushed');
      assert(path === '/');
      assert(title === 'blog.bouzuya.net');
    } else {
      assert.fail();
    }
  });
});

test(category + 'menu: false, entry: null', () => {
  const message$ = xs.of(<StateEvent>{
    type: 'state',
    state: {
      entry: null,
      menu: false
    }
  });
  return toPromise(model(message$)).then((values) => {
    assert(values.length === 1);
    const value = values[0];
    if (value.type === 'history-pushed') {
      const { type, path, title } = value;
      assert(type === 'history-pushed');
      assert(path === '/');
      assert(title === 'blog.bouzuya.net');
    } else {
      assert.fail();
    }
  });
});

test(category + 'menu: false, entry: { id, title }', () => {
  const message$ = xs.of(<StateEvent>{
    type: 'state',
    state: {
      entry: { id: '2006-01-02', title: 'title1' },
      menu: false
    }
  });
  return toPromise(model(message$)).then((values) => {
    assert(values.length === 1);
    const value = values[0];
    if (value.type === 'history-pushed') {
      const { type, path, title } = value;
      assert(type === 'history-pushed');
      assert(path === '/2006/01/02/');
      assert(title === '2006-01-02 title1 - blog.bouzuya.net');
    } else {
      assert.fail();
    }
  });
});

test(category + 'same path', () => {
  const stateEvent = <StateEvent>{
    type: 'state',
    state: {
      entry: { id: '2006-01-02', title: 'title1' },
      menu: false
    }
  };
  const message$ = xs.from([stateEvent, stateEvent]);
  return toPromise(model(message$)).then((values) => {
    assert(values.length === 1); // !== 2
    const value = values[0];
    if (value.type === 'history-pushed') {
      assert(value.type === 'history-pushed');
      assert(value.path === '/2006/01/02/');
      assert(value.title === '2006-01-02 title1 - blog.bouzuya.net');
    } else {
      assert.fail();
    }
  });
});

test(category + 'different path', () => {
  const stateEvent1 = <StateEvent>{
    type: 'state',
    state: {
      entry: { id: '2006-01-02', title: 'title1' },
      menu: false
    }
  };
  const stateEvent2 = <StateEvent>{
    type: 'state',
    state: {
      entry: { id: '2006-01-03', title: 'title2' },
      menu: false
    }
  };
  const message$ = xs.from([stateEvent1, stateEvent2]);
  return toPromise(model(message$)).then((values) => {
    assert(values.length === 2);
    const value0 = values[0];
    if (value0.type === 'history-pushed') {
      assert(value0.type === 'history-pushed');
      assert(value0.path === '/2006/01/02/');
      assert(value0.title === '2006-01-02 title1 - blog.bouzuya.net');
    } else {
      assert.fail();
    }
    const value1 = values[1];
    if (value1.type === 'history-pushed') {
      assert(value1.type === 'history-pushed');
      assert(value1.path === '/2006/01/03/');
      assert(value1.title === '2006-01-03 title2 - blog.bouzuya.net');
    } else {
      assert.fail();
    }
  });
});
