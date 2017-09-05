import { Test, test } from 'beater';
import * as assert from 'power-assert';
import xs from 'xstream';

import { StateEvent } from '../../../src/common/event/state-event';
import { model } from '../../../src/common/handler/history';
import { toPromise } from './_';

const category = '/common/handler/history ';

const tests1: Test[] = [
  test(category + 'entry: null, focus: "entry-list"', () => {
    const message$ = xs.of(<StateEvent>{
      type: 'state',
      state: {
        entryViewer: {
          selectedEntryId: null,
        },
        focus: 'entry-list'
      }
    });
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 1);
      assert(values[0].type === 'history-pushed');
      assert(values[0].path === '/');
      assert(values[0].title === 'blog.bouzuya.net');
    });
  }),
  test(category + 'entry: { id, title }, focus: "entry-list"', () => {
    const message$ = xs.of(<StateEvent>{
      type: 'state',
      state: {
        entryViewer: {
          partialEntries: [{ id: '2006-01-02', title: 'title1' }],
          selectedEntryId: '2006-01-02'
        },
        focus: 'entry-list'
      }
    });
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 1);
      assert(values[0].type === 'history-pushed');
      assert(values[0].path === '/');
      assert(values[0].title === 'blog.bouzuya.net');
    });
  }),
  test(category + 'entry: null, focus: "entry-detail"', () => {
    const message$ = xs.of(<StateEvent>{
      type: 'state',
      state: {
        entryViewer: { selectedEntryId: null },
        focus: 'entry-detail'
      }
    });
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 1);
      assert(values[0].type === 'history-pushed');
      assert(values[0].path === '/');
      assert(values[0].title === 'blog.bouzuya.net');
    });
  }),
  test(category + 'entry: { id, title }, focus: "entry-detail"', () => {
    const message$ = xs.of(<StateEvent>{
      type: 'state',
      state: {
        entryViewer: {
          partialEntries: [{ id: '2006-01-02', title: 'title1' }],
          selectedEntryId: '2006-01-02'
        },
        focus: 'entry-detail'
      }
    });
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 1);
      assert(values[0].type === 'history-pushed');
      assert(values[0].path === '/2006/01/02/');
      assert(values[0].title === '2006-01-02 title1 - blog.bouzuya.net');
    });
  }),
  test(category + 'same path', () => {
    const stateEvent = <StateEvent>{
      type: 'state',
      state: {
        entryViewer: {
          partialEntries: [{ id: '2006-01-02', title: 'title1' }],
          selectedEntryId: '2006-01-02'
        },
        focus: 'entry-detail'
      }
    };
    const message$ = xs.from([stateEvent, stateEvent]);
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 1); // !== 2
      assert(values[0].type === 'history-pushed');
      assert(values[0].path === '/2006/01/02/');
      assert(values[0].title === '2006-01-02 title1 - blog.bouzuya.net');
    });
  }),
  test(category + 'different path', () => {
    const stateEvent1 = <StateEvent>{
      type: 'state',
      state: {
        entryViewer: {
          partialEntries: [{ id: '2006-01-02', title: 'title1' }],
          selectedEntryId: '2006-01-02'
        },
        focus: 'entry-detail'
      }
    };
    const stateEvent2 = <StateEvent>{
      type: 'state',
      state: {
        entryViewer: {
          partialEntries: [{ id: '2006-01-03', title: 'title2' }],
          selectedEntryId: '2006-01-03'
        },
        focus: 'entry-detail'
      }
    };
    const message$ = xs.from([stateEvent1, stateEvent2]);
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 2);
      assert(values[0].type === 'history-pushed');
      assert(values[0].path === '/2006/01/02/');
      assert(values[0].title === '2006-01-02 title1 - blog.bouzuya.net');
      assert(values[1].type === 'history-pushed');
      assert(values[1].path === '/2006/01/03/');
      assert(values[1].title === '2006-01-03 title2 - blog.bouzuya.net');
    });
  }),
  test(category + 'HistoryPoppedEvent', () => {
    const stateEvent1 = <StateEvent>{
      type: 'state',
      state: {
        entryViewer: {
          partialEntries: [{ id: '2006-01-02', title: 'title1' }],
          selectedEntryId: '2006-01-02'
        },
        focus: 'entry-detail'
      }
    };
    const stateEvent2 = <StateEvent>{
      type: 'state',
      state: {
        entryViewer: {
          partialEntries: [{ id: '2006-01-03', title: 'title2' }],
          selectedEntryId: '2006-01-03'
        },
        focus: 'entry-detail'
      }
    };
    const message$ = xs.from([stateEvent1, stateEvent2, stateEvent1]);
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 3);
      assert(values[0].type === 'history-pushed');
      assert(values[0].path === '/2006/01/02/');
      assert(values[0].title === '2006-01-02 title1 - blog.bouzuya.net');
      assert(values[1].type === 'history-pushed');
      assert(values[1].path === '/2006/01/03/');
      assert(values[1].title === '2006-01-03 title2 - blog.bouzuya.net');
      assert(values[2].type === 'history-popped');
      assert(values[2].path === '/2006/01/02/');
      assert(values[2].title === '2006-01-02 title1 - blog.bouzuya.net');
    });
  })
];

export { tests1 as tests };
