import * as assert from 'power-assert';
import beater from 'beater';
import xs, { Listener, Stream } from 'xstream';
import {
  HistoryPoppedEvent
} from '../../../src/common/event/history-popped-event';
import {
  HistoryPushedEvent
} from '../../../src/common/event/history-pushed-event';
import { model } from '../../../src/common/handler/title';

const { test, fixture } = beater();

const category = 'handler > title > ';

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

test(category + 'HistoryPoppedEvent', fixture({
  before: () => {
    const window = { document: { title: void 0 } };
    const originalWindow: any = (<any>global).window;
    (<any>global).window = window;
    return { originalWindow, window };
  },
  after: ({ originalWindow }: any) => {
    (<any>global).window = originalWindow;
  },
}, ({ window }) => {
  const message$ = xs.of(<HistoryPoppedEvent>{
    type: 'history-popped',
    title: 'title1'
  });
  return toPromise(model(message$)).then((values) => {
    assert(values.length === 1);
    assert(values[0].type === 'noop');
    assert(window.document.title === 'title1');
  });
}));

test(category + 'HistoryPushedEvent', fixture({
  before: () => {
    const window = { document: { title: void 0 } };
    const originalWindow: any = (<any>global).window;
    (<any>global).window = window;
    return { originalWindow, window };
  },
  after: ({ originalWindow }: any) => {
    (<any>global).window = originalWindow;
  },
}, ({ window }) => {
  const message$ = xs.of(<HistoryPushedEvent>{
    type: 'history-pushed',
    title: 'title1'
  });
  return toPromise(model(message$)).then((values) => {
    assert(values.length === 1);
    assert(values[0].type === 'noop');
    assert(window.document.title === 'title1');
  });
}));
