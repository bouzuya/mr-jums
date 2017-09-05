import { Test, test } from 'beater';
import * as assert from 'power-assert';
import xs from 'xstream';

import { FetchPostsRequestCommand } from '../../../src/common/command/fetch-posts-request-command';
import { NextCommand } from '../../../src/common/command/next-command';
import { PrevCommand } from '../../../src/common/command/prev-command';
import { StateEvent } from '../../../src/common/event/state-event';
import { Message } from '../../../src/common/model/message';
import { Entry } from '../../../src/common/type/entry';
import { State } from '../../../src/common/type/state';
import { model } from '../../../src/common/handler/request';
import { toPromise } from './_';

const category = '/common/handler/request ';

const tests1: Test[] = [
  test(category + 'fetch-posts-request command', () => {
    const request = { foo: 'bar' };
    const message$ = xs.of(<FetchPostsRequestCommand>{
      type: 'fetch-posts-request',
      request
    });
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 1);
      assert(values[0].type === 'request');
      assert.deepEqual(values[0].request, request);
    });
  }),
  test(category + 'state event (null) & next command', () => {
    const state = {
      entryViewer: {
        allEntries: null,
      }
    } as State;
    const message$: xs<Message> = xs.of<Message>({
      type: 'state',
      state
    } as StateEvent, {
      type: 'next'
    } as NextCommand);
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 1);
      assert(values[0].type === 'request');
      assert.deepEqual(values[0].request, {
        category: 'posts',
        url: 'https://blog.bouzuya.net/posts.json'
      });
    });
  }),
  test(category + 'state event (not null) & next command', () => {
    const state = {
      entryViewer: {
        allEntries: ([] as Entry[]), // not null
      }
    } as State;
    const message$: xs<Message> = xs.of<Message>({
      type: 'state',
      state
    } as StateEvent, {
      type: 'next'
    } as NextCommand);
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 0);
    });
  }),
  test(category + 'state event (null) & prev command', () => {
    const state = {
      entryViewer: {
        allEntries: null,
      }
    } as State;
    const message$: xs<Message> = xs.of<Message>({
      type: 'state',
      state
    } as StateEvent, {
      type: 'prev'
    } as PrevCommand);
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 1);
      assert(values[0].type === 'request');
      assert.deepEqual(values[0].request, {
        category: 'posts',
        url: 'https://blog.bouzuya.net/posts.json'
      });
    });
  }),
  test(category + 'state event (not null) & prev command', () => {
    const state = {
      entryViewer: {
        allEntries: ([] as Entry[]), // not null
      }
    } as State;
    const message$: xs<Message> = xs.of<Message>({
      type: 'state',
      state
    } as StateEvent, {
      type: 'prev'
    } as PrevCommand);
    return toPromise(model(message$)).then((values) => {
      assert(values.length === 0);
    });
  })
  // TODO: fetch-post-request
];

export { tests1 as tests };
