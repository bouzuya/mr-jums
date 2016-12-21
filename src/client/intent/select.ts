import { DOMSource } from '@cycle/dom';
import xs from 'xstream';
import { Command } from '../../common/command';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Command> => {
  const clickList$: xs<Event> = DOM.select('li').events('click');
  const select$: xs<Command> = clickList$
    .map((event) => {
      let target: HTMLElement | null = event.target as HTMLElement;
      while (target && target.tagName !== 'LI') {
        target = target.parentElement;
      }
      if (target === null) return; // undefined
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
    .map<Command>((entryId: string) => ({ type: 'select', entryId }));
  return select$;
};

export { intent };
