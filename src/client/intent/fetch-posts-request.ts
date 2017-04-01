import xs from 'xstream';

import { Sources } from '../type/sources';
import { Command } from './util/command';
import { url } from '../../common/util/url';

const intent = ({ DOM }: Sources): xs<Command> => {
  const click$: xs<Event> = DOM.select('div.reload').events('click');
  const command$: xs<Command> = click$
    .map<Command>(() => ({
      type: 'fetch-posts-request',
      request: {
        url: url('/posts.json'),
        category: 'posts'
      }
    }));
  return command$;
};

export { intent };
