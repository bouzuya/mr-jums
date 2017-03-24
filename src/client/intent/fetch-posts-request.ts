import { DOMSource } from '@cycle/dom';
import xs from 'xstream';
import { Command } from './util/command';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Command> => {
  const click$: xs<Event> = DOM.select('div.reload').events('click');
  const command$: xs<Command> = click$
    .map<Command>(() => ({
      type: 'fetch-posts-request',
      request: {
        url: 'https://blog.bouzuya.net/posts.json',
        category: 'posts'
      }
    }));
  return command$;
};

export { intent };
