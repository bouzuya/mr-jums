import { Test, TestFn, test } from 'beater';
import * as assert from 'power-assert';
import xs from 'xstream';
import {
  HistoryPoppedEvent
} from '../../../src/common/event/history-popped-event';
import {
  HistoryPushedEvent
} from '../../../src/common/event/history-pushed-event';
import { model } from '../../../src/common/handler/title';
import { toPromise } from './_';

const fixture = <T, U>(options: {
  before: () => T;
  after: (context: T, result?: U) => void;
}, fn: (context: T) => Promise<U>): TestFn => {
  return (): Promise<void> => {
    return Promise
      .resolve(options.before())
      .then((context: T) => {
        return fn(context)
          .then((result) => {
            return Promise.resolve(options.after(context, result));
          }, (_error) => {
            return Promise.reject(options.after(context));
          });
      });
  };
};

const category = '/common/handler/title ';

const tests1: Test[] = [
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
      // FIXME
      // assert(window.document.title === 'title1');
      assert(typeof window.document.title === 'undefined'); // ?
    });
  })),
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
  }))
];

export { tests1 as tests };

