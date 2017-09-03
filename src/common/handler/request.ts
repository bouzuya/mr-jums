import xs from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine';
import { FetchPostsRequestCommand } from '../command';
import { select } from './util/select';
import { getCurrentSelectedEntry } from '../model/entry-viewer';
import { Command, Event, Message } from '../model/message';
import { RequestEvent, StateEvent } from '../event';
import { State } from '../type/state';
import { url } from '../util/url';

const fetchPostsRequest$ = (message$: xs<Message>): xs<any> => {
  return xs.merge(
    select<FetchPostsRequestCommand>(
      message$, 'fetch-posts-request')
      .map(({ request }) => request),
    message$
      .filter(({ type }) => type === 'next' || type === 'prev')
      .compose(sampleCombine(message$.filter(({ type }) => type === 'state')))
      .filter(([_, state]) => (state as StateEvent).state.entryViewer.allEntries === null)
      .map(() => ({
        url: url('/posts.json'),
        category: 'posts'
      }))
  );
};

const fetchPostRequest$ = (message$: xs<Message>): xs<any> => {
  interface S {
    b: boolean;
    id: string | null;
  }
  const initial: S = { b: false, id: null };
  return message$
    .filter((message) => message.type === 'state')
    .map<StateEvent>((message) => message as StateEvent)
    .map<State>(({ state }) => state)
    .map<{ l: string | null; d: string | null; }>((state) => {
      const d = state.selectedEntryDetail;
      const l = getCurrentSelectedEntry(state.entryViewer);
      return {
        d: d === null ? null : d.id,
        l: l === null ? null : l.id
      };
    })
    .fold(({ id }, { l, d }) => {
      return l === null || l === d
        ? initial
        : { b: l !== id, id: l };
    }, initial)
    .filter(({ b, id }) => b && id !== null)
    .map(({ id }) => {
      return {
        url: url(`/${id!.replace(/-/g, '/')}.json`),
        category: 'post'
      };
    });
};

const model = (message$: xs<Message>): xs<RequestEvent> => {
  const request$ = xs.merge(
    fetchPostsRequest$(message$),
    fetchPostRequest$(message$)
  )
    .map<RequestEvent>((request) => ({ type: 'request', request }));
  return request$;
};

export { model, Command, Event };
