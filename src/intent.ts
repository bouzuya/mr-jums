import xs from 'xstream';
import { Action } from './action';
import { DOMSource } from '@cycle/dom';

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

const intent = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const action$: xs<Action> = xs.merge(
    enter$({ DOM }),
    menu$({ DOM }),
    next$({ DOM }),
    prev$({ DOM }),
    select$({ DOM })
  );
  return action$;
};

export { intent };
