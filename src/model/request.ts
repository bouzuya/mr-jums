import xs from 'xstream';
import { FetchPostsRequestCommand } from '../command';
import { select } from './select';
import { Command, Event, Message } from './message';
import { RequestEvent, StateEvent } from '../event';
import { State } from '../type';

const model = (message$: xs<Message>): xs<RequestEvent> => {
  const fetchPostsRequest$ = select<FetchPostsRequestCommand>(
    message$, 'fetch-posts-request')
    .map(({ request }) => request);
  const fetchPostRequest$ = message$
    .filter((message) => message.type === 'state')
    .map<StateEvent>((message) => message as StateEvent)
    .map<State>(({ state }) => state)
    .fold(({ id: prev }, { entryViewer: { selectedEntryId: id } }) => {
      if (typeof prev === 'undefined') return { id, req: false };
      if (prev === id) return { id, req: false };
      return { id, req: true };
    }, { id: undefined, req: false } as {
      id: string | null | undefined;
      req: boolean;
    })
    .filter(({ id, req }) => {
      return req && (typeof id !== 'undefined' && id !== null);
    })
    .map(({ id }) => {
      return {
        url: `http://blog.bouzuya.net/${id!.replace(/-/g, '/')}.json`,
        category: 'post'
      };
    });
  const request$ = xs.merge(fetchPostsRequest$, fetchPostRequest$)
    .map<RequestEvent>((request) => ({ type: 'request', request }));
  return request$;
};

export { model, Command, Event };
