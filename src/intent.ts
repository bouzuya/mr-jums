import xs from 'xstream';
import { Action } from './action';
import { DOMSource } from '@cycle/dom';

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
    select$({ DOM }),
    toggle$({ DOM })
  );
  return action$;
};

export { intent };
