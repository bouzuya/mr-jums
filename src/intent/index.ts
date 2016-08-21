import xs from 'xstream';
import { Action } from '../action';
import { DOMSource } from '@cycle/dom';
import { HTTPSource } from '@cycle/http';

import { intent as enter$ } from './enter';
import { intent as fetchPostsRequest$ } from './fetch-posts-request';
import { intent as fetchPostsSuccess$ } from './fetch-posts-success';
import { intent as menu$ } from './menu';
import { intent as next$ } from './next';
import { intent as prev$ } from './prev';
import { intent as select$ } from './select';

const intent = (sources: { DOM: DOMSource; HTTP: HTTPSource }): xs<Action> => {
  const action$: xs<Action> = xs.merge(
    enter$(sources),
    fetchPostsRequest$(sources),
    fetchPostsSuccess$(sources),
    menu$(sources),
    next$(sources),
    prev$(sources),
    select$(sources)
  );
  return action$;
};

export { intent };
