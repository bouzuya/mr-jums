import xs from 'xstream';
import { Action, FetchPostsSuccessAction } from '../action';
import { DOMSource } from '@cycle/dom';
import { HTTPSource, Response as HTTPResponse } from '@cycle/http';

const fetchPostsRequest$ = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
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

const fetchPostsSuccess$ = ({ HTTP }: { HTTP: HTTPSource; }): xs<Action> => {
  const response$: xs<HTTPResponse> = HTTP.select('posts').flatten();
  const action$: xs<Action> = response$
    .map<FetchPostsSuccessAction>((response) => ({
      type: 'fetch-posts-success',
      posts: response.body as { // TODO
        date: string; // yyyy-mm-dd in +09:00
        minutes: number;
        pubdate: string; // yyyy-mm-ddThh:mm:ss+09:00
        tags: string[];
        title: string;
      }[]
    }));
  return action$;
};

const menu$ = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const click$: xs<Event> = DOM.select('div.menu').events('click');
  const action$: xs<Action> = click$.map<Action>(() => ({ type: 'menu' }));
  return action$;
};

const next$ = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const click$: xs<Event> = DOM.select('div.next').events('click');
  const next$: xs<Action> = click$.map<Action>(() => ({ type: 'next' }));
  return next$;
};

const prev$ = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const click$: xs<Event> = DOM.select('div.prev').events('click');
  const prev$: xs<Action> = click$.map<Action>(() => ({ type: 'prev' }));
  return prev$;
};

const enter$ = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const click$: xs<Event> = DOM.select('div.enter').events('click');
  const enter$: xs<Action> = click$.map<Action>(() => ({ type: 'enter' }));
  return enter$;
};

const select$ = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const clickList$: xs<Event> = DOM.select('li').events('click');
  const select$: xs<Action> = clickList$
    .map((event) => {
      let target = event.target as Element;
      while (target && target.tagName !== 'LI') {
        target = target.parentElement;
      }
      const classList: string[] = Array.from(target.classList);
      const entryId: string | undefined = classList
        .map((c) => {
          const m = c.match(/^entry-id-(.*)$/);
          return m === null ? undefined : m[1];
        })
        .filter((i) => typeof i !== 'undefined')[0];
      return entryId;
    })
    .filter((entryId) => typeof entryId !== 'undefined')
    .map<Action>((entryId: string) => ({ type: 'select', entryId }));
  return select$;
};

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
