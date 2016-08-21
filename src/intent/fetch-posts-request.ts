import xs from 'xstream';
import { Action } from '../action';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const click$: xs<Event> = DOM.select('div.reload').events('click');
  const action$: xs<Action> = click$
    .map<Action>(() => ({
      type: 'fetch-posts-request',
      request: {
        url: 'http://blog.bouzuya.net/posts.json',
        category: 'posts'
      }
    }));
  return action$;
};

export { intent };
