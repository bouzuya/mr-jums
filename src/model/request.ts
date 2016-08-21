import xs from 'xstream';
import { FetchPostsRequestCommand } from '../command';
import { select } from './select';
import { Command, Event, Message } from './message';
import { RequestEvent } from '../event';

const model = (command$: xs<Message>): xs<RequestEvent> => {
  const fetchPostsRequest$ = select<FetchPostsRequestCommand>(
    command$, 'fetch-posts-request')
    .map(({ request }) => request);

  const request$ = xs.merge(fetchPostsRequest$)
    .map<RequestEvent>((request) => ({ type: 'request', request }));
  return request$;
};

export { model, Command, Event };
