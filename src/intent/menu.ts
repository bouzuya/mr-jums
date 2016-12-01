import xs from 'xstream';
import { Command } from '../command';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Command> => {
  const click1$: xs<Event> = DOM.select('div.menu').events('click');
  const click2$: xs<Event> = DOM.select('.entry-detail')
    .events('click')
    .filter((e: Event) => !(<any>e.target).matches('.entry, .entry *'));
  const click$ = xs.merge(click1$, click2$);
  const command$: xs<Command> = click$.map<Command>(() => ({ type: 'menu' }));
  return command$;
};

export { intent };
