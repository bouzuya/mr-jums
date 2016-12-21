import xs from 'xstream';
import { RequestOptions as HTTPRequest } from '@cycle/http';
import { RequestEvent } from '../../common/event';

const view = (request$: xs<RequestEvent>): xs<HTTPRequest> => {
  return request$.map(({ request }) => request);
};

export { view };
