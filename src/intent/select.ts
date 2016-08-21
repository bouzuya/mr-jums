import xs from 'xstream';
import { Action } from '../action';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
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

export { intent };
