import { DOMSource } from '@cycle/dom';
import xs from 'xstream';
import { Command } from './util/command';
import { url } from '../../common/util/url';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Command> => {
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
