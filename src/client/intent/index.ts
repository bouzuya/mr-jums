import xs from 'xstream';
import { DOMSource } from '@cycle/dom';
import { HTTPSource } from '@cycle/http';
import { Command } from './util/command';

import { Sources } from '../type/sources';
import { intent as enter$ } from './enter';
import { intent as fetchPostSuccess$ } from './fetch-post-success';
import { intent as fetchPostsRequest$ } from './fetch-posts-request';
import { intent as fetchPostsSuccess$ } from './fetch-posts-success';
import { intent as menu$ } from './menu';
import { intent as next$ } from './next';
import { intent as prev$ } from './prev';
import { intent as select$ } from './select';

const intent = (sources: Sources): xs<Command> => {
  const command$: xs<Command> = xs.merge(
    enter$(sources),
    fetchPostSuccess$(sources),
    fetchPostsRequest$(sources),
    fetchPostsSuccess$(sources),
    menu$(sources),
    next$(sources),
    prev$(sources),
    select$(sources)
  );
  return command$;
};

export { intent };
