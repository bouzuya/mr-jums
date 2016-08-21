import xs from 'xstream';
import {
  Command,
  CommandType,
  FetchPostsRequestCommand,
} from '../command';
import { RequestEvent } from '../event';

const select = <T extends Command>(
  command$: xs<Command>, type: CommandType
): xs<T> => {
  return command$.filter((command) => command.type === type) as xs<T>;
};

const model = (command$: xs<Command>): xs<RequestEvent> => {
  const request$ = select<FetchPostsRequestCommand>(
    command$, 'fetch-posts-request')
    .map(({ request }) => request)
    .map<RequestEvent>((request) => ({ type: 'request', request }));
  return request$;
};

export { model };
