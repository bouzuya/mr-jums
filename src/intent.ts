import xs from 'xstream';
import { Action } from './action';
import { DOMSource } from '@cycle/dom';

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

const toggle$ = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const clickCheckbox$: xs<Event> = DOM.select('input').events('click');
  const toggle$: xs<Action> = clickCheckbox$
    .map((event) => (event.target as any).checked)
    .map<Action>((checked) => ({ type: 'toggle', checked }));
  return toggle$;
};

const intent = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const action$: xs<Action> = xs.merge(
    next$({ DOM }),
    prev$({ DOM }),
    select$({ DOM }),
    toggle$({ DOM })
  );
  return action$;
};

export { intent };
